import { Router } from "express";
import { CartsController } from ".";

import {
  createValidation,
  updateOrUpdateValidation,
} from "./cartsValidation.midleware";
import { paramIdValidation } from "../../shared/middleware/paramsIdValidation";

const router = Router();

router.post("/", createValidation, CartsController.create);
router.get("/", CartsController.getAll);
router.get("/:id", paramIdValidation, CartsController.getById);
router.put(
  "/:id",
  paramIdValidation,
  updateOrUpdateValidation,
  CartsController.update,
);
router.delete("/:id", paramIdValidation, CartsController.delete);

export { router as CartsRoutes };
