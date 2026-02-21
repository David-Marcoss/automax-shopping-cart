export interface ICartProduct {
  id: number;
  quantity: number;
  cartId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateCartProduct {
  id?: number;
  quantity: number;
  cartId: number;
}

export interface IUpdateCartProduct {
  id?: number;
  quantity?: number;
  cartId?: number;
}
