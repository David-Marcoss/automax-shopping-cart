import "dotenv/config";

import express from "express";
import cors from "cors";
import { CartsRoutes } from "./modules/carts/carts.routes";
import { CartProductsRoutes } from "./modules/cartProducts/carts.routes";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/carts", CartsRoutes);
app.use("/cartProducts", CartProductsRoutes);

app.listen(3000, () => {
  console.log("Server rodando em http://localhost:3000");
});
