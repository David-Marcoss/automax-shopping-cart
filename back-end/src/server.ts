import "dotenv/config";

import express from "express";
import cors from "cors";
import { cartsRoutes } from "./modules/carts/carts.routes";

export const app = express();

app.use(express.json());
app.use(cors());

app.use("/carts", cartsRoutes);

app.listen(3000, () => {
  console.log("Server rodando em http://localhost:3000");
});
