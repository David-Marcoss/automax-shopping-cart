import { Request, Response } from "express";
import { CartsService } from "./carts.service";
import { ICreateCart } from "./carts.type";

export class CartsController {
  constructor(private service: CartsService) {}

  create = async (req: Request<any, any, ICreateCart>, res: Response) => {
    try {
      const data = req.body;

      const cart = await this.service.createOrUpdate(data);

      return res.status(201).json(cart);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const cart = await this.service.getById(id);

      return res.json(cart);
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const carts = await this.service.getAll();

      return res.json(carts);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const cart = await this.service.update({
        id,
        ...req.body,
      });

      return res.json(cart);
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
