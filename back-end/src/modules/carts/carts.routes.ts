import { Router } from "express";
import { CartsController } from ".";


const router = Router();

router.post("/", CartsController.create);
router.get("/", CartsController.getAll);
router.get("/:id", CartsController.getById);
router.put("/:id", CartsController.update);
router.delete("/:id", CartsController.delete);

export { router as cartsRoutes };
