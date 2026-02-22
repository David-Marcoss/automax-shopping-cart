import { Router } from "express";
import { ProductsController } from ".";

import {
  createValidation,
  updateValidation,
} from "./productsValidation.midleware";
import { paramIdValidation } from "../../shared/middleware/paramsIdValidation";

const router = Router();

router.post("/", createValidation, ProductsController.create);
router.get("/", ProductsController.getAll);
router.get("/:id", paramIdValidation, ProductsController.getById);
router.put(
  "/:id",
  paramIdValidation,
  updateValidation,
  ProductsController.update,
);
router.delete("/:id", paramIdValidation, ProductsController.delete);

export { router as ProductsRoutes };
