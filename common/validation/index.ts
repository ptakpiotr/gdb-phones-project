import * as yup from "yup";

const phoneBasic = {
  make: yup.string().required(),
  model: yup.string().required(),
};

const ownedSchema = yup.object({
  price: yup.number().min(0).required(),
});

export const phoneSchema = yup.object({
  id: yup.string(),
  ...phoneBasic,
  description: yup.string().required(),
  image: yup.string().url().required(),
});

export const personSchema = yup.object({
  id: yup.string(),
  name: yup.string().required(),
  surname: yup.string().required(),
});

export const reviewSchema = yup.object({
  person: personSchema.required(),
  review: yup
    .object({
      rating: yup.number().min(1).max(5).required(),
      description: yup.string().required(),
      phoneId: yup.string().required(),
    })
    .required(),
});
const phoneBasicSchema = yup.object(phoneBasic);
export const buySchema = yup.object({
  person: personSchema.required(),
  owned: ownedSchema,
  phone: phoneBasicSchema,
});

export const editPhoneSchema = yup.object({
  ...phoneBasic,
  description: yup.string().required(),
  image: yup.string().required(),
});

export const editPhoneInputSchema = yup.object({
  id: yup.string().required(),
});

export type Phone = yup.InferType<typeof phoneSchema>;
export type Owned = yup.InferType<typeof buySchema>;
export type PhoneBasic = yup.InferType<typeof phoneBasicSchema>;
export type EditPhone = yup.InferType<typeof editPhoneSchema>;
export type ValidationError = yup.ValidationError;
