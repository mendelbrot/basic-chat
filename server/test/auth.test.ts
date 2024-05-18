import { expect } from "chai";
import supertest from "supertest";
import app from "../src/main";
import { publicUserFields } from "../src/models/users.model";

describe("sign in", () => {
  it("should 401 if username is incorrect", async () => {
    const res = await supertest(app).post("/api/auth/login").send({
      username: "soandso",
      password: "password",
    });
    expect(res.statusCode).to.equal(401);
    expect(res.header["authorization"]).to.be.undefined;
  });

  it("should 401 if password is incorrect", async () => {
    const res = await supertest(app).post("/api/auth/login").send({
      username: "user1",
      password: "wrongpassword",
    });
    expect(res.statusCode).to.equal(401);
    expect(res.header["authorization"]).to.be.undefined;
  });

  it("should 200 provide token if credentials are correct", async () => {
    const res = await supertest(app).post("/api/auth/login").send({
      username: "user1",
      password: "password",
    });
    expect(res.statusCode).to.equal(200);
    expect(res.headers["authorization"])
      .to.be.a("string")
      .and.match(/^Bearer /);
  });

  it("should 200 return the public user fields in the body if credentials are correct", async () => {
    const res = await supertest(app).post("/api/auth/login").send({
      username: "user1",
      password: "password",
    });
    expect(res.body).to.have.all.keys(publicUserFields);
    expect(res.body).to.not.have.key("password");
    expect(res.body.activeAt).to.be.a.string;
  });
});
