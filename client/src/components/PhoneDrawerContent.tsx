import { signal } from "@preact/signals-react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";
import { IPhoneDrawer } from "../Types";

function PhoneDrawerContent() {
  const phone = signal<Partial<Omit<IPhoneDrawer, "type">>>({});
  const toast = useToast();
  const handleClick = () => {
    toast({
      status: "success",
      variant: "solid",
      title: "Added item",
      description: "Succesfully added new phone",
      isClosable: true,
      duration: 2000,
    });
  };

  return (
    <Box display="flex" flexDirection="column" rowGap="1rem">
      <Input
        placeholder="Description"
        onChange={(e) => {
          phone.value.description = e.target.value;
        }}
      />
      <Input
        placeholder="Image"
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
