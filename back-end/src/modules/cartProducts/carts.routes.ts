import { Router } from "express";
import { CartProductsController } from ".";

import {
  createValidation,
  updateValidation,
} from "./cartProductsValidation.midleware";
import { paramIdValidation } from "../../shared/middleware/paramsIdValidation";

const router = Router();

router.post("/", createValidation, CartProductsController.create);
router.get("/", CartProductsController.getAll);
router.get("/:id", paramIdValidation, CartProductsController.getById);
router.put(
  "/:id",
  paramIdValidation,
  updateValidation,
  CartProductsController.update,
);
router.delete("/:id", paramIdValidation, CartProductsController.delete);

export { router as CartProductsRoutes };
