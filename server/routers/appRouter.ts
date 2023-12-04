import {
  addPhone,
  addPhoneBuy,
  addReview,
  deleteBoughtPhone,
  editSinglePhone,
  getAllUserReviews,
  getBoughtPhones,
  getPeople,
  getPhonePicker,
  getPhones,
  getSinglePhone,
} from "../data/dbAccess";
import {
  buySchema,
  editPhoneInputSchema,
  editPhoneSchema,
  getBoughtPhonesSchema,
  personSchema,
  phoneSchema,
  reviewSchema,
} from "../../common/validation";
import { t } from "../trpc";

export const appRouter = t.router({
  getPhones: t.procedure.query(async () => {
    return await getPhones();
  }),
  getSinglePhone: t.procedure
    .input(editPhoneInputSchema)
    .query(async ({ input }) => {
      return await getSinglePhone(input.id);
    }),
  getPickerPhones: t.procedure.query(async () => {
    return await getPhonePicker();
  }),
  getPeople: t.procedure.query(async () => {
    return await getPeople();
  }),
  getAllReviews: t.procedure.input(personSchema).query(async ({ input }) => {
    return await getAllUserReviews(input);
  }),
  addPhone: t.procedure.input(phoneSchema).mutation(async ({ input }) => {
    return await addPhone(input);
  }),
  addReview: t.procedure.input(reviewSchema).mutation(async ({ input }) => {
    return await addReview(input.person, input.review);
  }),
  addPhoneBuy: t.procedure.input(buySchema).mutation(async ({ input }) => {
    return await addPhoneBuy(input);
  }),
  editPhone: t.procedure.input(editPhoneSchema).mutation(async ({ input }) => {
    return await editSinglePhone(input);
  }),
  getBoughtPhones: t.procedure
    .input(getBoughtPhonesSchema)
    .query(async ({ input }) => {
      return await getBoughtPhones(input.name, input.surname);
    }),
  deleteBoughtPhone: t.procedure
    .input(personSchema)
    .mutation(async ({ input }) => {
      return await deleteBoughtPhone({ ...input });
    }),
});

export type AppRouter = typeof appRouter;
