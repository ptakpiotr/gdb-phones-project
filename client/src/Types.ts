import type { IconType } from "react-icons";
import type { ButtonProps } from "@chakra-ui/react";
export interface IPhoneInfoShort {
  id: string;
  description: string;
  image: string;
}

export interface IPhoneInfo extends IPhoneInfoShort {}

export interface IOptionalButton {
  text: string;
  icon: IconType;
  colorScheme: ButtonProps["colorScheme"];
  onClick: () => void;
}

export enum Drawers {
  PHONE,
  PERSON,
}

export interface IPhoneDrawer {
  type: Drawers.PHONE;
  description: string;
  image: string;
}

export interface IPersonDrawer {
  type: Drawers.PERSON;
  firstName: string;
  lastName: string;
  avatar: string;
}
