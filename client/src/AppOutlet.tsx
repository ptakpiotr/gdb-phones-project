import Breadcrumbs from "./components/Breadcrumbs";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { effect } from "@preact/signals-react";
import { useLocation } from "react-router-dom";
import { optionalBreadCrumbButton } from "./signals";

function AppOutlet() {
  const loc = useLocation();

  effect(() => {
    loc.key;
    optionalBreadCrumbButton.value = undefined;
  });

  return (
    <>
      <Breadcrumbs />
      <Box
        height="calc(100vh - 10rem)"
        maxHeight="calc(100vh - 10rem)"
        overflowY="scroll"
        padding="0.5rem"
      >
        <Outlet />
      </Box>
    </>
  );
}

export default AppOutlet;
