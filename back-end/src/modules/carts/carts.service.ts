import { CartsRepository } from "./carts.repository";
import { ICart, ICreateCart, IUpdateCart } from "./carts.type";

export class CartsService {
  constructor(private repository: CartsRepository) {}

  async createOrUpdate(data: ICreateCart): Promise<ICart> {
    return this.repository.upsert(data);
  }

  async getById(id: number): Promise<ICart> {
    const cart = await this.repository.getById(id);

    if (!cart) {
      throw new Error("Cart not found");
    }

    return cart;
  }

  async getAll(): Promise<ICart[]> {
    return this.repository.getAll();
  }

  async update(data: IUpdateCart): Promise<ICart> {
    if (!data.id) {
      throw new Error("Required a valid ID to update cart");
    }

    const existingCart = await this.repository.getById(data.id);

    if (!existingCart) {
      throw new Error("Cart not found");
    }

    return this.repository.update(data);
  }

  async delete(id: number): Promise<void> {
    const existingCart = await this.repository.getById(id);

    if (!existingCart) {
      throw new Error("Cart not found");
    }

    await this.repository.delete(id);
  }
}
