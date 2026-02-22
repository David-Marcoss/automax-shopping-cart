import { ProductsRepository } from "./products.repository";
import { IProduct, ICreateProduct, IUpdateProduct } from "./products.type";

export class ProductsService {
  constructor(private repository: ProductsRepository) {}

  async create(data: ICreateProduct): Promise<IProduct> {
    return this.repository.create(data);
  }

  async getById(id: number): Promise<IProduct | null> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<IProduct[]> {
    return this.repository.getAll();
  }

  async update(data: IUpdateProduct): Promise<IProduct> {
    if (!data.id) {
      throw new Error("ID is required to update");
    }

    const existing = await this.repository.getById(data.id);

    if (!existing) {
      throw new Error(" product not found");
    }

    return this.repository.update(data);
  }

  async delete(id: number): Promise<void> {
    const existing = await this.repository.getById(id);

    if (!existing) {
      throw new Error(" product not found");
    }

    await this.repository.delete(id);
  }
}
