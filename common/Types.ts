import { InferType } from "yup";
import { reviewSchema } from "./validation";
export type Person = InferType<typeof reviewSchema>["person"];

export type Review = Omit<
  InferType<typeof reviewSchema>["review"],
  "phoneId"
> & {
  phoneId?: string;
};
