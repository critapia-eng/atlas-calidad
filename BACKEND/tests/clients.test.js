const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../src/app");

const JWT_SECRET = process.env.JWT_SECRET || "inseguro";

describe("Pruebas de seguridad y control de acceso - Clientes (DEF-01)", () => {
  test("Un usuario sin token no puede listar clientes -> 401", async () => {
    const res = await request(app).get("/clientes");
    expect(res.statusCode).toBe(401);
  });

  test("Un editor NO puede eliminar clientes -> 403", async () => {
    const tokenEditor = jwt.sign(
      { id: 2, nombreUsuario: "editor", rol: "editor", empresaId: 1 },
      JWT_SECRET
    );

    const res = await request(app)
      .delete("/clientes/999")
      .set("Authorization", `Bearer ${tokenEditor}`);

    expect(res.statusCode).toBe(403);
  });
});