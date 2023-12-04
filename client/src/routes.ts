import { IMenuRoute } from "./Types";
import About from "./pages/About";
import Home from "./pages/Home";
import People from "./pages/People";
import Person from "./pages/Person";
import Phone from "./pages/Phone";
import Phones from "./pages/Phones";
import { FiHome, FiPhone, FiUser, FiInfo } from "react-icons/fi";
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
    icon: FiUser,
    path: "/people",
    description: "People",
    Component: People,
    showInMenu: true,
  },
  {
    path: "/phone/:id",
    description: "Phone",
    Component: Phone,
    showInMenu: false,
  },
  {
    path: "/person",
    description: "Person",
    Component: Person,
    showInMenu: false,
  },
  {
    path: "*",
    description: "NotFound",
    Component: Person,
    showInMenu: false,
  },
  {
    icon: FiInfo,
    path: "/about",
    description: "About",
    Component: About,
    showInMenu: true,
  },
] as IMenuRoute[];
