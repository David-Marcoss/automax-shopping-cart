import * as yup from "yup";

import { validation } from "../../shared/middleware/Validation";
import { ICreateCartProduct, IUpdateCartProduct } from "./cartProducts.type";

const createBodyValidation: yup.Schema<ICreateCartProduct> = yup
  .object()
  .shape({
    id: yup.number(),
    cartId: yup.number().required(),
    productId: yup.number().required(),
    quantity: yup.number().min(1).required(),
  });

// midleware validação dados do body
export const createValidation = validation({
  body: createBodyValidation,
});

const updateBodyValidation: yup.Schema<IUpdateCartProduct> = yup
  .object()
  .shape({
    cartId: yup.number(),
    productId: yup.number(),
    quantity: yup.number().min(1),
  });

// midleware validação dados do body
export const updateValidation = validation({
  body: updateBodyValidation,
});
