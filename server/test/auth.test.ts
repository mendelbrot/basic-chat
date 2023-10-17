import { expect } from "chai";
import supertest from "supertest";
import app from "../src/main";
import { signToken } from "../src/lib/auth";
import User from "../src/models/users.model";

describe("sign in", () => {
  it("should 401 if username is incorrect", async () => {
    const res = await supertest(app).post("/auth/sign-in").send({
      username: "soandso",
      password: "password",
    });
    expect(res.statusCode).to.equal(401);
    expect(res.header["authorization"]).to.be.undefined;
  });

  it("should 401 if password is incorrect", async () => {
    const res = await supertest(app).post("/auth/sign-in").send({
      username: "user1",
      password: "wrongpassword",
    });
    expect(res.statusCode).to.equal(401);
    expect(res.header["authorization"]).to.be.undefined;
  });

  it("should provide token if credentials are correct", async () => {
    const res = await supertest(app).post("/auth/sign-in").send({
      username: "user1",
      password: "password",
    });
    expect(res.statusCode).to.equal(200);
    console.log(res)
    expect(res.headers["authorization"])
      .to.be.a("string")
      .and.match(/^Bearer /);
  });
});
