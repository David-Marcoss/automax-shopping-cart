import { Request, Response } from "express";
import { ProductsService } from "./products.service";
import { ICreateProduct } from "./products.type";

export class ProductsController {
  constructor(private service: ProductsService) {}

  create = async (req: Request<any, any, ICreateProduct>, res: Response) => {
    try {
      const data = req.body;

      const product = await this.service.create(data);

      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const product = await this.service.getById(id);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      return res.json(product);
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const products = await this.service.getAll();

      return res.json(products);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const product = await this.service.update({
        id,
        ...req.body,
      });

      return res.json(product);
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
