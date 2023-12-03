import { signal } from "@preact/signals-react";
import { Box, Button, Input, Spinner, useToast } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { trpc } from "../App";
import { reviewSchema, ValidationError } from "../../../common/validation";
import { Person, Review } from "../../../common/Types";
import { useQueryClient } from "@tanstack/react-query";
import AppPicker from "./AppPicker";
import { ChangeEvent } from "react";
import { PhoneShort } from "../Types";

function PersonDrawerContent() {
  const person = signal<Partial<Person>>({});
  const review = signal<Partial<Review>>({});

  const queryClient = useQueryClient();
  const { mutate } = trpc.addReview.useMutation();
  const { data, error } = trpc.getPickerPhones.useQuery();

  const toast = useToast();

  const handleClick = async () => {
    let res: boolean | undefined = false;

    try {
      const reviewValidated = await reviewSchema.validate({
        person: person.value,
        review: review.value,
      });

      await mutate(reviewValidated);
      queryClient.resetQueries();
      res = true;
    } catch (err: unknown) {
      const validationErr = err as ValidationError;

      toast({
        status: "error",
        variant: "solid",
        title: "Review addition",
        description: validationErr.message,
        isClosable: true,
        duration: 2000,
      });
    }

    if (res) {
      toast({
        status: "success",
        variant: "solid",
        title: "Added item",
        description: "Succesfully added new review",
        isClosable: true,
        duration: 2000,
      });

      person.value = {};
      review.value = {};
    }
  };

  const onPickerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    review.value.phoneId = data
      ? data.find((r) => r.id === e.target.value)?.id ?? ""
      : "";
  };

  return (
    <Box display="flex" flexDirection="column" rowGap="1rem">
      <Input
        placeholder="Name *"
        onChange={(e) => {
          person.value.name = e.target.value;
        }}
      />
      <Input
        placeholder="Surname *"
        onChange={(e) => {
          person.value.surname = e.target.value;
        }}
      />
      <Input
        placeholder="Description *"
        onChange={(e) => {
          review.value.description = e.target.value;
        }}
      />
      <Input
        placeholder="Rating *"
        type="number"
        min={1}
        max={5}
        onChange={(e) => {
          review.value.rating = parseInt(e.target.value);
        }}
      />
      {data && !error ? (
        error ? (
          <>An error has occured</>
        ) : (
          <AppPicker
            options={data}
            title="Phones *"
            onChange={onPickerChange}
            renderValue={(v: PhoneShort) => {
              return `${v.make} ${v.model}`;
            }}
          />
        )
      ) : (
        <Spinner />
      )}
      <Button
        variant="solid"
        colorScheme="green"
        rightIcon={<FiSave />}
        onClick={handleClick}
      >
        Save
      </Button>
    </Box>
  );
}

export default PersonDrawerContent;
