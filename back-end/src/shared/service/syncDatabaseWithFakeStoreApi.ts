import axios from "axios";
import {
  FakeStoreCart,
  FakeStoreProduct,
} from "../types/fakeStoreDataResponse";

import { CartsService } from "../../modules/carts";
import { ProductsService } from "../../modules/products";
import { CartProductsService } from "../../modules/cartProducts";

const SyncDataBase = {
  syncCartsDataWithExternalApi: async (): Promise<void> => {
    const externalApi = process.env.FAKE_STORE_API_URL;
    if (!externalApi) return;

    try {
      const [cartsResponse, productsResponse] = await Promise.all([
        axios.get<FakeStoreCart[]>(`${externalApi}/carts`),
        axios.get<FakeStoreProduct[]>(`${externalApi}/products`),
      ]);

      const carts = cartsResponse.data;
      const products = productsResponse.data;

      const productsMap = new Map<number, FakeStoreProduct>();
      for (const product of products) {
        productsMap.set(product.id, product);
      }

      for (const item of carts) {
        const { products: cartProducts, ...cartData } = item;

        let cart = await CartsService.getById(cartData.id);

        if (!cart) {
          cart = await CartsService.create({
            id: cartData.id,
            date: cartData.date,
            userId: cartData.userId,
          });
        }

        for (const cartProduct of cartProducts) {
          const productId = cartProduct.productId;

          // 🔹 Garante que produto exista
          let product = await ProductsService.getById(productId);

          if (!product) {
            const productData = productsMap.get(productId);
            if (!productData) continue;

            product = await ProductsService.create({
              id: productData.id,
              title: productData.title,
              description: productData.description,
              category: productData.category,
              image: productData.image,
              price: productData.price,
            });
          }

          const existingCartProduct =
            await CartProductsService.getByCartIdAndProductId(
              cart!.id,
              product.id,
            );

          if (!existingCartProduct) {
            await CartProductsService.createOrUpdate({
              cartId: cart!.id,
              productId: product.id,
              quantity: cartProduct.quantity,
            });
          }
        }
      }

      console.log("Sincronização concluída com sucesso...");
    } catch (error) {
      console.error("Erro ao sincronizar carts", error);
    }
  },
};

export { SyncDataBase };
