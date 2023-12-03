import { Box, Button, Input, useToast } from "@chakra-ui/react";
import {
  Phone,
  ValidationError,
  editPhoneSchema,
} from "../../../common/validation";
import { NoData } from "./NoData";
import { FiEdit2 } from "react-icons/fi";
import { signal, effect } from "@preact/signals-react";
import { trpc } from "../App";
import { useQueryClient } from "@tanstack/react-query";

const editPhoneData = signal<Partial<Phone>>({});
const firstRender = signal<boolean>(true);

function PhoneInfo({ ph }: { ph?: Phone[] }) {
  const { mutate } = trpc.editPhone.useMutation();
  const toast = useToast();
  const queryClient = useQueryClient();

  if (!ph) {
    return <NoData />;
  }

  effect(() => {
    if (firstRender.value) {
      editPhoneData.value = ph[0];
      firstRender.value = false;
    }
  });

  const modifyPhoneData = <T extends string>(prop: keyof Phone, newVal: T) => {
    editPhoneData.value = {
      ...editPhoneData.value,
      [prop]: newVal,
    };
  };

  const editData = async () => {
    let res = false;

    try {
      const editValidate = await editPhoneSchema.validate(editPhoneData.value);
      await mutate(editValidate);
      queryClient.refetchQueries();

      res = true;
    } catch (err: unknown) {
      const validationErr = err as ValidationError;

      toast({
        status: "error",
        variant: "solid",
        title: "Edited phone",
        description: validationErr.message,
        isClosable: true,
        duration: 2000,
      });
    }

    if (res) {
      toast({
        status: "success",
        variant: "solid",
        title: "Edit phone",
        description: "Succesfully edited phone data",
        isClosable: true,
        duration: 2000,
      });
    }
  };

  return (
    <Box display="flex" flexDirection="column" rowGap="1rem">
      <Box>
        <Input
          placeholder="Make"
          onChange={(e) => {
            modifyPhoneData("make", e.target.value);
          }}
          value={editPhoneData.value.make}
        />
      </Box>
      <Box>
        <Input
          placeholder="Model"
          onChange={(e) => {
            modifyPhoneData("model", e.target.value);
          }}
          value={editPhoneData.value.model}
        />
      </Box>
      <Box>
        <Input
          placeholder="Description"
          onChange={(e) => {
            modifyPhoneData("description", e.target.value);
          }}
          value={editPhoneData.value.description}
        />
      </Box>
      <Box>
        <Input
          placeholder="Image"
          onChange={(e) => {
            modifyPhoneData("image", e.target.value);
          }}
          value={editPhoneData.value.image}
        />
      </Box>
      <Button rightIcon={<FiEdit2 />} onClick={editData}>
        Edit
      </Button>
    </Box>
  );
}

export default PhoneInfo;
