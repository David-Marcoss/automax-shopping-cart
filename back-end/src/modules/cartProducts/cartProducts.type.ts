import { IProduct } from "../products/products.type";

export interface ICartProduct {
  id: number;
  productId: number;
  quantity: number;
  cartId: number;
  product?: IProduct;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCartProduct {
  id?: number;
  quantity: number;
  cartId: number;
  productId: number;
}

export interface IUpdateCartProduct {
  id?: number;
  quantity?: number;
  cartId?: number;
  productId?: number;
}
