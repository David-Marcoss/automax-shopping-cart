import { RequestHandler } from "express";
import { Schema, ValidationError } from "yup";

/**
 * TPropety é um tipo de dado que indica qual campo
 * da requisição será validado
 */
type TPropety = "header" | "body" | "params" | "query";

/**
 * TAllSchemas é um tipo de dado que é um objeto com
 * os shemas de validação da requisição, onde a chave
 * é o dado que sera validado("header","body","params","query")
 * e o valor é o schema de validação
 */
type TAllSchemas = Partial<Record<TPropety, Schema<any>>>;

/**
 * Tvalidation é um tipo de dado que é
 * uma função que recebe um schema Yup e retorna um middleware
 */
type Tvalidation = (schemas: TAllSchemas) => RequestHandler;

/**
 * Uma função de validação que recebe um schema Yup
 * e retorna um middleware de validação dos dados
 */
export const validation: Tvalidation = (schemas) => (req, res, next) => {
  const errorResult: Record<string, Record<string, string>> = {};

  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      const validatedData = schema.validateSync(req[key as TPropety], {
        abortEarly: false,
        stripUnknown: true,
        strict: true,
      });

      req[key as TPropety] = validatedData;
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach((error) => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });

      errorResult[key] = errors;
    }
  });

  if (Object.keys(errorResult).length === 0) return next();

  return res.status(400).json({
    message: "Validation error",
    errors: errorResult,
  });
};
