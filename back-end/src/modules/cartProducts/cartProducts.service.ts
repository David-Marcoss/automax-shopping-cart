import { CartsService } from "../carts";
import { ProductsService } from "../products";
import { CartProductsRepository } from "./cartProducts.repository";
import {
  ICartProduct,
  ICreateCartProduct,
  IUpdateCartProduct,
} from "./cartProducts.type";

export class CartProductsService {
  constructor(private repository: CartProductsRepository) {}

  async create(data: ICreateCartProduct): Promise<ICartProduct | null> {
    if (data.id) {
      const extistingCart = await this.getById(data.id);

      if (extistingCart) return null;
    }

    return this.repository.create(data);
  }

  async getById(id: number): Promise<ICartProduct | null> {
    const item = await this.repository.getById(id);

    return item;
  }

  async getByCartIdAndProductId(
    productId: number,
    cartId: number,
  ): Promise<ICartProduct | null> {
    const item = await this.repository.getByCartIdAndProductId(
      cartId,
      productId,
    );

    return item;
  }

  async getAll(): Promise<ICartProduct[]> {
    return this.repository.getAll();
  }

  async update(data: IUpdateCartProduct): Promise<ICartProduct> {
    return this.repository.update(data);
  }

  async delete(id: number): Promise<void> {
    const existing = await this.repository.getById(id);

    if (!existing) {
      throw new Error("Cart product not found");
    }

    await this.repository.delete(id);
  }
}
