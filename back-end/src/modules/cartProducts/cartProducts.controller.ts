import { Request, Response } from "express";
import { CartProductsService } from "./cartProducts.service";
import { ICreateCartProduct } from "./cartProducts.type";

export class CartProductsController {
  constructor(private service: CartProductsService) {}

  create = async (
    req: Request<any, any, ICreateCartProduct>,
    res: Response,
  ) => {
    try {
      const data = req.body;

      const cartProduct = await this.service.createOrUpdate(data);

      return res.status(201).json(cartProduct);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const cartProduct = await this.service.getById(id);

      return res.json(cartProduct);
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const cartProducts = await this.service.getAll();

      return res.json(cartProducts);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const cartProduct = await this.service.update({
        id,
        ...req.body,
      });

      return res.json(cartProduct);
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      await this.service.delete(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };
}
