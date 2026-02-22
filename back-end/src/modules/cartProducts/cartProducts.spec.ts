import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../../server";
import { prisma } from "../../database/prisma";

describe("CartProducts - Integration", () => {
  // helper para criar dependências
  const createDependencies = async () => {
    const product = await prisma.products.create({
      data: {
        title: "Test Product",
        price: 100,
        description: "desc",
        category: "any",
        image: "img.png",
      },
    });

    const cart = await prisma.carts.create({
      data: {
        userId: 1,
        date: new Date(),
      },
    });

    return { product, cart };
  };

  // -------------------------
  // CREATE
  // -------------------------

  it("should create a cart product", async () => {
    const { product, cart } = await createDependencies();

    const response = await request(app).post("/cartProducts").send({
      cartId: cart.id,
      productId: product.id,
      quantity: 2,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.cartId).toBe(cart.id);
    expect(response.body.productId).toBe(product.id);
    expect(response.body.quantity).toBe(2);
  });

  // -------------------------
  // GET ALL
  // -------------------------

  it("should list all cart products", async () => {
    const { product, cart } = await createDependencies();

    await prisma.cartProducts.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity: 3,
      },
    });

    const response = await request(app).get("/cartProducts");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // -------------------------
  // GET BY ID
  // -------------------------

  it("should get cart product by id", async () => {
    const { product, cart } = await createDependencies();

    const cartProduct = await prisma.cartProducts.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity: 5,
      },
    });

    const response = await request(app).get(`/cartProducts/${cartProduct.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(cartProduct.id);
  });

  it("should return 404 if cart product not found", async () => {
    const response = await request(app).get("/cartProducts/999999");
    expect(response.status).toBe(404);
  });

  // -------------------------
  // UPDATE
  // -------------------------

  it("should update a cart product", async () => {
    const { product, cart } = await createDependencies();

    const cartProduct = await prisma.cartProducts.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity: 1,
      },
    });

    const response = await request(app)
      .put(`/cartProducts/${cartProduct.id}`)
      .send({
        quantity: 10,
      });

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(10);
  });

  it("should return 404 when updating non-existing cart product", async () => {
    const response = await request(app)
      .put("/cartProducts/999999")
      .send({ quantity: 10 });

    expect(response.status).toBe(404);
  });

  // -------------------------
  // DELETE
  // -------------------------

  it("should delete a cart product", async () => {
    const { product, cart } = await createDependencies();

    const cartProduct = await prisma.cartProducts.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        quantity: 2,
      },
    });

    const response = await request(app).delete(
      `/cartProducts/${cartProduct.id}`,
    );

    expect(response.status).toBe(204);

    const deleted = await prisma.cartProducts.findUnique({
      where: { id: cartProduct.id },
    });

    expect(deleted).toBeNull();
  });

  it("should return 404 when deleting non-existing cart product", async () => {
    const response = await request(app).delete("/cartProducts/999999");

    expect(response.status).toBe(404);
  });
});
