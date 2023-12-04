import type { IconType } from "react-icons";
import type { ButtonProps } from "@chakra-ui/react";
import { Phone } from "../../common/validation";

export interface IOptionalButton {
  text: string;
  icon: IconType;
  colorScheme: ButtonProps["colorScheme"];
  onClick: () => void;
}

export type PhoneShort = Required<Pick<Phone, "id" | "make" | "model">>;

export interface IPhoneInfoShort extends PhoneShort {
  description: string;
  image: string;
}

export enum Drawers {
  PHONE,
  PERSON,
}

export enum FilterPanels {
  PHONE,
  PERSON,
}

export interface IPhoneDrawer extends Phone {
  type: Drawers.PHONE;
}

export interface IPersonDrawer {
  type: Drawers.PERSON;
  firstName: string;
  lastName: string;
  avatar: string;
}

type FilterInput<T> = {
  [n in keyof T]: {
    name: n;
    value: T[n];
  };
};

type FilterInputUnion<T> = {
  [n in keyof T as "filters"]: T[n];
};

export type PhoneFilterInputPanel = {
  type: FilterPanels.PHONE;
  filters: FilterInputUnion<
    FilterInput<Omit<Phone, "description" | "image" | "type" | "id">>
  >["filters"][];
};

export type PersonFilterInputPanel = {
  type: FilterPanels.PERSON;
  filters: FilterInputUnion<FilterInput<IPersonDrawer>>["filters"][];
};

export interface IFilterInputPanel {
  filterPanel?: PhoneFilterInputPanel | PersonFilterInputPanel;
}

export interface IMenuRoute {
  icon?: IconType;
  path: string;
  description: string;
  Component: (params: any) => JSX.Element;
  showInMenu?: true;
}
