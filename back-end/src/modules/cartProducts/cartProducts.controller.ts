import { Request, Response } from "express";
import { CartProductsService } from "./cartProducts.service";
import { ICreateCartProduct } from "./cartProducts.type";
import { CartsService } from "../carts";
import { ProductsService } from "../products";

export class CartProductsController {
  constructor(private service: CartProductsService) {}

  create = async (
    req: Request<any, any, ICreateCartProduct>,
    res: Response,
  ) => {
    try {
      const data = req.body;

      // valida se o cart existe
      const cart = await CartsService.getById(data.cartId);

      if (!cart) {
        return res.status(404).json({
          message: `cartId not found`,
        });
      }

      const product = await ProductsService.getById(data.productId);

      if (!product) {
        return res.status(404).json({
          message: `productId not found`,
        });
      }

      const cartProduct = await this.service.create(data);

      if (!cartProduct) {
        return res.status(400).json({
          message: `Cart Product with id ${data.id} already registered`,
        });
      }

      return res.status(201).json(cartProduct);
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const cartProduct = await this.service.getById(id);
      if (!cartProduct) {
        return res.status(404).json({
          message: "Cart Product not found",
        });
      }

      return res.json(cartProduct);
    } catch (error: any) {
      return res.status(500).json({
        message: "Internal server error",
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
      const data = req.body;

      const cartProduct = await this.service.getById(id);

      if (!cartProduct) {
        return res.status(404).json({
          message: `Cart Product not found`,
        });
      }

      if (data.cartId) {
        const cart = await CartsService.getById(data.cartId);

        if (!cart) {
          return res.status(404).json({
            message: `cartId not found`,
          });
        }
      }

      if (data.productId) {
        const product = await ProductsService.getById(data.productId);

        if (!product) {
          return res.status(404).json({
            message: `productId not found`,
          });
        }
      }

      const result = await this.service.update({
        id,
        ...req.body,
      });

      return res.json(result);
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
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
