import * as yup from "yup";

import { validation } from "../../shared/middleware/Validation";
import { ICreateCartProduct } from "./cartProducts.type";

const bodyValidation: yup.Schema<ICreateCartProduct> = yup.object().shape({
  id: yup.number(),
  cartId: yup.number().required(),
  quantity: yup.number().min(1).required(),
});

// midleware validação dados do body
export const createOrUpdateValidation = validation({
  body: bodyValidation,
});
