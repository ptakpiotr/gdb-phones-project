import { Box } from "@chakra-ui/react";
import AppMenu from "./AppMenu";
function Header() {
  return (
    <Box bgColor="main.100" color="text.100" padding="1rem">
      <AppMenu /> Phone reviewer
    </Box>
  );
}

export default Header;
