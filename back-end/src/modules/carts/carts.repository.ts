import { prisma } from "../../database/prisma";
import { ICart, ICreateCart, IUpdateCart } from "./carts.type";

export class CartsRepository {
  async create(data: ICreateCart): Promise<ICart> {
    const formatedData = {
      ...data,
      date: new Date(data.date),
    };

    return await prisma.carts.create({
      data: formatedData,
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
    return await prisma.carts.findMany({
      include: {
        products: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  async update(data: IUpdateCart): Promise<ICart> {
    if (!data.id) {
      throw new Error("ID is required to update Cart");
    }

    return await prisma.carts.update({
      where: { id: data.id },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.carts.delete({
      where: { id },
    });
  }
}
