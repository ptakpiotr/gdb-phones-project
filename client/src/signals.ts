import { Signal, signal } from "@preact/signals-react";
import { IOptionalButton, PhoneShort } from "./Types";

export const isLoading = signal(true);
export const optionalBreadCrumbButton: Signal<IOptionalButton | undefined> =
  signal(undefined);

export const isDrawerOpen = signal(false);

export const phoneInfo = signal<PhoneShort[]>([]);
