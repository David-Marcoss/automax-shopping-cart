import {
  ICartProduct,
  ICreateCartProduct,
  IUpdateCartProduct,
} from "../cartProducts/cartProducts.type";

export interface ICart {
  id: number;
  userId: string;
  date: Date;
  products?: ICartProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCart {
  id?: number;
  userId: string;
  date: Date;
}

export interface IUpdateCart {
  id?: number;
  userId?: string;
  date?: Date;
}
