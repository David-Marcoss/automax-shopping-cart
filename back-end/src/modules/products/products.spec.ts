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
});
