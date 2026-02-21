import { Router } from "express";
import { ProductsController } from ".";

import { createOrUpdateValidation } from "./productsValidation.midleware";
import { paramIdValidation } from "src/shared/middleware/paramsIdValidation";

const router = Router();

router.post("/", createOrUpdateValidation, ProductsController.create);
router.get("/", ProductsController.getAll);
router.get("/:id", paramIdValidation, ProductsController.getById);
router.put(
  "/:id",
  paramIdValidation,
  createOrUpdateValidation,
  ProductsController.update,
);
router.delete("/:id", paramIdValidation, ProductsController.delete);

export { router as ProductsRoutes };
