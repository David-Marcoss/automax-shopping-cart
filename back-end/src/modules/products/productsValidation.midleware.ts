import * as yup from "yup";

import { validation } from "../../shared/middleware/Validation";
import { ICreateProduct, IUpdateProduct } from "./products.type";

const createBodyValidation: yup.Schema<ICreateProduct> = yup.object().shape({
  id: yup.number(),
  title: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  image: yup.string().required(),
  price: yup.number().min(1).required(),
});

// midleware validação dados do body
export const createValidation = validation({
  body: createBodyValidation,
});

const updateBodyValidation: yup.Schema<IUpdateProduct> = yup.object().shape({
  title: yup.string(),
  description: yup.string(),
  category: yup.string(),
  image: yup.string(),
  price: yup.number().min(1),
});

// midleware validação dados do body
export const updateValidation = validation({
  body: updateBodyValidation,
});
