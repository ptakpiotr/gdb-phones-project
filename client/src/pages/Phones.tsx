import { Box } from "@chakra-ui/react";
import LoadingData from "../components/LoadingData";
import { effect } from "@preact/signals-react";
import { FiPlus } from "react-icons/fi";
import {
  shortPhoneInfo,
  isLoading,
  optionalBreadCrumbButton,
  isDrawerOpen,
} from "../signals";

import PhoneCard from "../components/PhoneCard";
import AddDrawer from "../components/AddDrawer";
import { Drawers } from "../Types";

effect(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});

function Phones() {
  if (!isLoading.value) {
    optionalBreadCrumbButton.value = {
      colorScheme: "red",
      icon: FiPlus,
      text: "Add",
      onClick: () => {
        isDrawerOpen.value = true;
      },
    };
  }
  return (
    <>
      <AddDrawer type={Drawers.PHONE} />
      {!isLoading.value ? (
        <Box display="flex" flexWrap="wrap" flexDirection="row">
          {shortPhoneInfo.value.map((p) => (
            <PhoneCard key={p.id} {...p} />
          ))}
        </Box>
      ) : (
        <LoadingData />
      )}
    </>
  );
}

export default Phones;
