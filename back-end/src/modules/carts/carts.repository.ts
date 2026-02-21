import { prisma } from "src/database/prisma";
import { ICart, ICreateCart, IUpdateCart } from "./carts.type";

export class CartsRepository {
  async create(data: ICreateCart): Promise<ICart> {
    return prisma.carts.create({
      data,
    });
  }

  async getById(id: number): Promise<ICart | null> {
    return prisma.carts.findUnique({
      where: { id },
      include: {
        products: true, // inclui itens do carrinho
      },
    });
  }

  async getAll(): Promise<ICart[]> {
    return prisma.carts.findMany({
      include: {
        products: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(data: IUpdateCart): Promise<ICart> {
    if (!data.id) {
      throw new Error("ID is required to update Cart");
    }

    return prisma.carts.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.carts.delete({
      where: { id },
    });
  }
}
