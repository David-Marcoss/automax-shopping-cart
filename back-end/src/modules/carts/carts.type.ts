import { ICartProduct } from "../cartProducts/cartProducts.type";

export interface ICart {
  id: number;
  userId: number;
  date: Date;
  products?: ICartProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCart {
  id?: number;
  userId: number;
  date: Date;
}

export interface IUpdateCart {
  id?: number;
  userId?: number;
  date?: Date;
}
