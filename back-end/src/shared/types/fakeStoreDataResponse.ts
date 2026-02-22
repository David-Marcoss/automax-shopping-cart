export type FakeStoreCart = {
  id: number;
  userId: number;
  date: string;
  products: FakeStoreCartProduct[];
  __v: number;
};

export interface FakeStoreCartProduct {
  productId: number;
  quantity: number;
}

export interface FakeStoreProduct {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
