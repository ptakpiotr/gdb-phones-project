import { Button } from "@chakra-ui/react";
import { optionalBreadCrumbButton } from "../signals";

function OptionalBreadCrumbButton() {
  return optionalBreadCrumbButton.value ? (
    <Button
      colorScheme={optionalBreadCrumbButton.value.colorScheme}
      rightIcon={<>{optionalBreadCrumbButton.value.icon({})}</>}
      onClick={optionalBreadCrumbButton.value.onClick}
    >
      {optionalBreadCrumbButton.value.text}
    </Button>
  ) : (
    <></>
  );
}

export default OptionalBreadCrumbButton;
