import { prisma } from "../../database/prisma";
import {
  ICartProduct,
  ICreateCartProduct,
  IUpdateCartProduct,
} from "./cartProducts.type";

export class CartProductsRepository {
  async create(data: ICreateCartProduct): Promise<ICartProduct> {
    return await prisma.cartProducts.create({
      data: data,
    });
  }

  async getById(id: number): Promise<ICartProduct | null> {
    return await prisma.cartProducts.findFirst({
      where: { id },
      include: {
        product: true,
      },
    });
  }

  async getByCartIdAndProductId(
    productId: number,
    cartId: number,
  ): Promise<ICartProduct | null> {
    return await prisma.cartProducts.findFirst({
      where: { productId, cartId },
      include: {
        product: true,
      },
    });
  }

  async getAll(): Promise<ICartProduct[]> {
    return await prisma.cartProducts.findMany({
      include: {
        product: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(data: IUpdateCartProduct): Promise<ICartProduct> {
    return await prisma.cartProducts.update({
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
