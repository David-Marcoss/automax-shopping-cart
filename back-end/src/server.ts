import "dotenv/config";

import express from "express";
import cors from "cors";
import { CartsRoutes } from "./modules/carts/carts.routes";
import { CartProductsRoutes } from "./modules/cartProducts/carts.routes";
import { CartsService } from "./modules/carts";
import { SyncDataBase } from "./shared/service/syncDatabaseWithFakeStoreApi";
import { ProductsRoutes } from "./modules/products/products.routes";
import { startCronJobs } from "./shared/jobs/sync.job";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/carts", CartsRoutes);
app.use("/cartProducts", CartProductsRoutes);
app.use("/products", ProductsRoutes);

app.listen(3000, async () => {
  console.log("Server rodando em http://localhost:3000");

  // sync database with FakeStore API
  startCronJobs();
});
