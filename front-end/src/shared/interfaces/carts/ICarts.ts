import type { ICartProduct } from "../cartProducts/ICartProducts";

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
  date: string;
}

export interface IUpdateCart {
  id?: number;
  userId?: number;
  date?: string;
}
