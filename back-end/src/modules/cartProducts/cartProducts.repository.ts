import { prisma } from "src/database/prisma";
import {
  ICartProduct,
  ICreateCartProduct,
  IUpdateCartProduct,
} from "./cartProducts.type";

export class CartProductsRepository {
  async upsert(data: ICreateCartProduct): Promise<ICartProduct> {
    return prisma.cartProducts.upsert({
      where: { id: data.id, cartId: data.cartId },
      update: {
        ...data,
      },
      create: {
        ...data,
      },
    });
  }

  async getById(id: number): Promise<ICartProduct | null> {
    return prisma.cartProducts.findFirst({
      where: { id },
    });
  }

  async getAll(): Promise<ICartProduct[]> {
    return prisma.cartProducts.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(data: IUpdateCartProduct): Promise<ICartProduct> {
    if (!data.id) {
      throw new Error("ID is required to update CartProduct");
    }

    return prisma.cartProducts.update({
      where: { id: data.id },
      data: {
        quantity: data.quantity,
        cartId: data.cartId,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.cartProducts.delete({
      where: { id },
    });
  }
}
