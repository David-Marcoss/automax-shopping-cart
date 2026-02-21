import * as yup from "yup";

import { validation } from "./Validation";

const ParamsIdValidation: yup.Schema<{ id: string }> = yup.object().shape({
  id: yup
    .string()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : Number(originalValue),
    )
    .typeError("Id must be a number")
    .required(),
});

// midleware validação params
export const paramIdValidation = validation({
  params: ParamsIdValidation,
});
