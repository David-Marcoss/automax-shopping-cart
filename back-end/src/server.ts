import express from "express";
import { prisma } from "./database/prisma";

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API rodando 🚀" });
});

app.get("/carts", async (req, res) => {
  const carts = await prisma.carts.findMany();
  res.json(carts);
});

app.listen(3000, () => {
  console.log("🔥 Server rodando em http://localhost:3000");
});
