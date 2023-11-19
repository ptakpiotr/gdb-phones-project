import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import routes from "../routes";
import { useLocation, Link } from "react-router-dom";

function AppMenu() {
  const location = useLocation();

  return (
    <Menu>
      <MenuButton
        variant="outline"
        as={IconButton}
        icon={<FiMenu color="whitesmoke" />}
        _hover={{
          backgroundColor: "transparent",
        }}
        _active={{
          backgroundColor: "transparent",
          borderColor: "#90e0ef",
        }}
      ></MenuButton>
      <MenuList bgColor="main.100" border="none">
        {routes
          .filter((r) => r.showInMenu)
          .map((r) => (
            <MenuItem
              key={r.path}
              icon={<>{r.icon()}</>}
              bgColor={r.path === location.pathname ? "main.200" : "main.100"}
              color="text.100"
              as={Link}
              to={r.path}
            >
              {r.description}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}

export default AppMenu;
