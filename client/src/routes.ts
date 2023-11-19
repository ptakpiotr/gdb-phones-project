import Home from "./pages/Home";
import Phone from "./pages/Phone";
import Phones from "./pages/Phones";
import { FiHome, FiPhone } from "react-icons/fi";
export default [
  {
    icon: FiHome,
    path: "/",
    description: "Home",
    Component: Home,
    showInMenu: true,
  },
  {
    icon: FiPhone,
    path: "/phones",
    description: "Phones",
    Component: Phones,
    showInMenu: true,
  },
  {
    path: "/phone/:id",
    description: "Phone",
    Component: Phone,
    showInMenu: false,
  },
];
