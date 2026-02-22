import * as yup from "yup";

import { validation } from "../../shared/middleware/Validation";
import { ICreateCart, IUpdateCart } from "./carts.type";

const createBodyValidation: yup.Schema<ICreateCart> = yup.object().shape({
  id: yup.number(),
  userId: yup.number().required(),
  date: yup
    .string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
    .transform((value) => new Date(value)),
});

// midleware validação dados do body
export const createValidation = validation({
  body: createBodyValidation,
});

const updateBodyValidation: yup.Schema<IUpdateCart> = yup.object().shape({
  userId: yup.number(),
  date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
    .transform((value) => (value ? new Date(value) : undefined)),
});

// midleware validação dados do body
export const updateOrUpdateValidation = validation({
  body: updateBodyValidation,
});
