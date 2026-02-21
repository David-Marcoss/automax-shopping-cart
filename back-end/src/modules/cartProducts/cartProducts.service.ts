import { CartsService } from "../carts";
import { CartProductsRepository } from "./cartProducts.repository";
import {
  ICartProduct,
  ICreateCartProduct,
  IUpdateCartProduct,
} from "./cartProducts.type";

export class CartProductsService {
  constructor(private repository: CartProductsRepository) {}

  async createOrUpdate(data: ICreateCartProduct): Promise<ICartProduct> {
    // valida se o cart existe
    await CartsService.getById(data.cartId);

    return this.repository.upsert(data);
  }

  async getById(id: number): Promise<ICartProduct> {
    const item = await this.repository.getById(id);

    if (!item) {
      throw new Error("Cart product not found");
    }

    return item;
  }

  async getAll(): Promise<ICartProduct[]> {
    return this.repository.getAll();
  }

  async update(data: IUpdateCartProduct): Promise<ICartProduct> {
    if (!data.id) {
      throw new Error("ID is required to update");
    }

    if (data.cartId) {
      // valida se o cart existe
      await CartsService.getById(data.cartId);
    }

    const existing = await this.repository.getById(data.id);

    if (!existing) {
      throw new Error("Cart product not found");
    }

    if (data.quantity !== undefined && data.quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

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
