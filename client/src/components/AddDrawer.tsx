import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { isDrawerOpen as isOpen } from "../signals";
import { Drawers } from "../Types";
import PhoneDrawerContent from "./PhoneDrawerContent";
import PersonDrawerContent from "./PersonDrawerContent";

interface IProps {
  type: Drawers;
}

function AddDrawer({ type }: IProps) {
  const closeDrawer = () => {
    isOpen.value = false;
  };

  return (
    <Drawer isOpen={isOpen.value} placement="right" onClose={closeDrawer}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add new item</DrawerHeader>
        <DrawerBody>
          {type === Drawers.PHONE ? (
            <PhoneDrawerContent />
          ) : (
            <PersonDrawerContent />
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button colorScheme="orange" variant="solid" onClick={closeDrawer}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AddDrawer;
