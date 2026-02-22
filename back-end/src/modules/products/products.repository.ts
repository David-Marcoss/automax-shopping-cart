import { prisma } from "../../database/prisma";
import { IProduct, ICreateProduct, IUpdateProduct } from "./products.type";

export class ProductsRepository {
  async create(data: ICreateProduct): Promise<IProduct> {
    return await prisma.products.create({
      data: data,
    });
  }

  async getById(id: number): Promise<IProduct | null> {
    return await prisma.products.findFirst({
      where: { id },
    });
  }

  async getAll(): Promise<IProduct[]> {
    return await prisma.products.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async update(data: IUpdateProduct): Promise<IProduct> {
    if (!data.id) {
      throw new Error("ID is required to update Product");
    }

    return await prisma.products.update({
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
