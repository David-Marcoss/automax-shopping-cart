import { prisma } from "src/database/prisma";
import { IProduct, ICreateProduct, IUpdateProduct } from "./products.type";

export class ProductsRepository {
  async upsert(data: ICreateProduct): Promise<IProduct> {
    if (data.id) {
      return this.update(data);
    }

    return prisma.products.create({
      data: data,
    });
  }

  async getById(id: number): Promise<IProduct | null> {
    return prisma.products.findFirst({
      where: { id },
    });
  }

  async getAll(): Promise<IProduct[]> {
    return prisma.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(data: IUpdateProduct): Promise<IProduct> {
    if (!data.id) {
      throw new Error("ID is required to update Product");
    }

    return prisma.products.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.products.delete({
      where: { id },
    });
  }
}
