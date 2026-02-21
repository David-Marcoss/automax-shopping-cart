import * as yup from "yup";

import { validation } from "../../shared/middleware/Validation";
import { ICreateProduct } from "./products.type";

const bodyValidation: yup.Schema<ICreateProduct> = yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required(),
  price: yup.number().min(1).required(),
});

// midleware validação dados do body
export const createOrUpdateValidation = validation({
  body: bodyValidation,
});
