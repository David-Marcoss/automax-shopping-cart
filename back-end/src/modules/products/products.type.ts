export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateProduct {
  id?: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

export interface IUpdateProduct {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  image?: string;
  price?: number;
}
