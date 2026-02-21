import * as yup from "yup";

import { validation } from "../../shared/middleware/Validation";
import { ICreateCart } from "./carts.type";

const bodyValidation: yup.Schema<ICreateCart> = yup.object().shape({
  id: yup.number(),
  userId: yup.number().required(),
  date: yup
    .string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
    .transform((value) => new Date(value)),
});

// midleware validação dados do body
export const createOrUpdateValidation = validation({
  body: bodyValidation,
});
