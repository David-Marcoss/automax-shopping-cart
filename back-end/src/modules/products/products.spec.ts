import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../../server";
import { prisma } from "../../database/prisma";

describe("Products - Integration", () => {
  it("should create a product", async () => {
    const data = {
      title: "Test Product",
      price: 109.95,
      description: "A product description",
      category: "electronics",
      image: "https://fakestoreapi.com/img/test.png",
    };

    const response = await request(app).post("/products").send(data);

    console.log(response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe(data.title);
    expect(response.body.price).toBe(data.price);
  });

  it("should return 400 if missing required fields", async () => {
    const response = await request(app).post("/products").send({});
    expect(response.status).toBe(400);
  });

  it("should list all products", async () => {
    await prisma.products.create({
      data: {
        title: "Existing Product",
        price: 50,
        description: "desc",
        category: "any",
        image: "img.png",
      },
    });

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // -------------------------
  // UPDATE
  // -------------------------

  it("should update a product", async () => {
    const product = await prisma.products.create({
      data: {
        title: "Old Title",
        price: 100,
        description: "desc",
        category: "any",
        image: "img.png",
      },
    });

    const response = await request(app).put(`/products/${product.id}`).send({
      title: "Updated Title",
      price: 200,
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Title");
    expect(response.body.price).toBe(200);
  });

  it("should return 404 when updating non-existing product", async () => {
    const response = await request(app)
      .put("/products/999999")
      .send({ title: "Invalid" });

    expect(response.status).toBe(404);
  });

  it("should return 404 when updating with invalid id", async () => {
    const response = await request(app)
      .put("/products/abc")
      .send({ title: "Invalid" });

    expect(response.status).toBe(404);
  });

  // -------------------------
  // DELETE
  // -------------------------

  it("should delete a product", async () => {
    const product = await prisma.products.create({
      data: {
        title: "To Delete",
        price: 50,
        description: "desc",
        category: "any",
        image: "img.png",
      },
    });

    const response = await request(app).delete(`/products/${product.id}`);

    expect(response.status).toBe(204);

    const deleted = await prisma.products.findUnique({
      where: { id: product.id },
    });

    expect(deleted).toBeNull();
  });

  it("should return 404 when deleting non-existing product", async () => {
    const response = await request(app).delete("/products/999999");
    expect(response.status).toBe(404);
  });

  it("should return 404 when deleting with invalid id", async () => {
    const response = await request(app).delete("/products/abc");
    expect(response.status).toBe(404);
  });
});
