import { Router } from "express";
import { CartsController } from ".";

import { createOrUpdateValidation } from "./cartsValidation.midleware";
import { paramIdValidation } from "src/shared/middleware/paramsIdValidation";

const router = Router();

router.post("/", createOrUpdateValidation, CartsController.create);
router.get("/", CartsController.getAll);
router.get("/:id", paramIdValidation, CartsController.getById);
router.put(
  "/:id",
  paramIdValidation,
  createOrUpdateValidation,
  CartsController.update,
);
router.delete("/:id", paramIdValidation, CartsController.delete);

export { router as cartsRoutes };
