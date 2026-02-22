import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import { app } from "../../server";
import { prisma } from "../../database/prisma";

describe("Carts - Integration", () => {
  beforeEach(async () => {
    await prisma.carts.deleteMany();
  });

  // -------------------------
  // CREATE
  // -------------------------

  it("should create a cart", async () => {
    const data = {
      userId: 1,
      date: "2025-02-01",
    };

    const response = await request(app).post("/carts").send(data);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.userId).toBe(data.userId);
  });

  it("should return 400 if missing required fields", async () => {
    const response = await request(app).post("/carts").send({});
    expect(response.status).toBe(400);
  });

  // -------------------------
  // GET ALL
  // -------------------------

  it("should list all carts", async () => {
    await prisma.carts.create({
      data: {
        userId: 1,
        date: new Date(),
      },
    });

    const response = await request(app).get("/carts");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // -------------------------
  // GET BY ID
  // -------------------------

  it("should get cart by id", async () => {
    const cart = await prisma.carts.create({
      data: {
        userId: 2,
        date: new Date(),
      },
    });

    const response = await request(app).get(`/carts/${cart.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(cart.id);
    expect(response.body.userId).toBe(2);
  });

  it("should return 404 if cart not found", async () => {
    const response = await request(app).get("/carts/999999");
    expect(response.status).toBe(404);
  });

  it("should return 404 if id is invalid", async () => {
    const response = await request(app).get("/carts/abc");
    expect(response.status).toBe(404);
  });

  // -------------------------
  // UPDATE
  // -------------------------

  it("should update a cart", async () => {
    const cart = await prisma.carts.create({
      data: {
        userId: 3,
        date: new Date(),
      },
    });

    const newDate = "2025-02-01";

    const response = await request(app).put(`/carts/${cart.id}`).send({
      userId: 99,
      date: newDate,
    });

    expect(response.status).toBe(200);
    expect(response.body.userId).toBe(99);
  });

  it("should return 404 when updating non-existing cart", async () => {
    const response = await request(app)
      .put("/carts/999999")
      .send({ userId: 10 });

    expect(response.status).toBe(404);
  });

  it("should return 404 when updating with invalid id", async () => {
    const response = await request(app).put("/carts/abc").send({ userId: 10 });

    expect(response.status).toBe(404);
  });

  // -------------------------
  // DELETE
  // -------------------------

  it("should delete a cart", async () => {
    const cart = await prisma.carts.create({
      data: {
        userId: 5,
        date: new Date(),
      },
    });

    const response = await request(app).delete(`/carts/${cart.id}`);

    expect(response.status).toBe(204);

    const deleted = await prisma.carts.findUnique({
      where: { id: cart.id },
    });

    expect(deleted).toBeNull();
  });

  it("should return 404 when deleting non-existing cart", async () => {
    const response = await request(app).delete("/carts/999999");
    expect(response.status).toBe(404);
  });

  it("should return 404 when deleting with invalid id", async () => {
    const response = await request(app).delete("/carts/abc");
    expect(response.status).toBe(404);
  });
});
