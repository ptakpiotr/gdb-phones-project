import { Signal, signal } from "@preact/signals-react";
import { phones } from "./const";
import { IOptionalButton } from "./Types";

export const shortPhoneInfo = signal(phones);
export const isLoading = signal(true);
export const optionalBreadCrumbButton: Signal<IOptionalButton | undefined> =
  signal(undefined);

export const isDrawerOpen = signal(false);
