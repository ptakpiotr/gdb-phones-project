import { signal } from "@preact/signals-react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { trpc } from "../App";
import {
  Phone,
  phoneSchema,
  ValidationError,
} from "../../../common/validation";
import { useQueryClient } from "@tanstack/react-query";

function PhoneDrawerContent() {
  const phone = signal<Partial<Phone>>({});
  const queryClient = useQueryClient();
  const { mutate } = trpc.addPhone.useMutation();

  const toast = useToast();

  const handleClick = async () => {
    let res: boolean | undefined = false;

    try {
      const phoneValidated = await phoneSchema.validate(phone.value);

      await mutate(phoneValidated);
      queryClient.resetQueries();
      res = true;
    } catch (err: unknown) {
      const validationErr = err as ValidationError;

      toast({
        status: "error",
        variant: "solid",
        title: "Item addition",
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
        description: "Succesfully added new phone",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <Box display="flex" flexDirection="column" rowGap="1rem">
      <Input
        placeholder="Make *"
        onChange={(e) => {
          phone.value.make = e.target.value;
        }}
      />
      <Input
        placeholder="Model *"
        onChange={(e) => {
          phone.value.model = e.target.value;
        }}
      />
      <Input
        placeholder="Description *"
        onChange={(e) => {
          phone.value.description = e.target.value;
        }}
      />
      <Input
        placeholder="Image *"
        onChange={(e) => {
          phone.value.image = e.target.value;
        }}
      />
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

export default PhoneDrawerContent;
