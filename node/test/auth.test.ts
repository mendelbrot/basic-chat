import { expect } from "chai";
import supertest from "supertest";
import app from "../src/main";
import { publicUserFields } from "../src/models/users.model";
import UserTokenClass from "./lib/token";

let userTokenInstance: UserTokenClass;

async function loadToken() {
  userTokenInstance = await UserTokenClass.createInstance("user1");
}

describe("login", () => {
  it("should 401 if username is incorrect", async () => {
    const res = await supertest(app).post("/api/auth/login").send({
      username: "soandso",
      password: "password",
    });
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.not.include.keys(["data"]);
    expect(res.body).to.include.keys(["error"]);
  });

  it("should 401 if password is incorrect", async () => {
    const res = await supertest(app).post("/api/auth/login").send({
      username: "user1",
      password: "wrongpassword",
    });
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.not.include.keys(["data"]);
    expect(res.body).to.include.keys(["error"]);
  });

  it("should 200 provide token and public user", async () => {
    const res = await supertest(app).post("/api/auth/login").send({
      username: "user1",
      password: "password",
    });
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.include.keys(["data"]);
    expect(res.body).to.not.include.keys(["error"]);
    expect(res.body.data).to.include.keys(["token"]);
    expect(res.body.data).to.include.keys(["user"]);
    expect(res.body.data.token).to.be.a("string");
    expect(res.body.data.user).to.not.include.keys(["password"]);
    expect(res.body.data.user).to.include.keys(publicUserFields);
    expect(res.body.data.user.activeAt).to.be.a.string;
  });
});

describe("refresh-token", () => {
  before(loadToken);

  it("should 401 if token is invalid", async () => {
    const res = await supertest(app)
      .post("/api/auth/refresh-token")
      .set("authorization", `Bearer invalidtoken`);
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.not.include.keys(["data"]);
    expect(res.body).to.include.keys(["error"]);
  });

  it("should 200 return a new token", async () => {
    const res = await supertest(app)
      .post("/api/auth/refresh-token")
      .set("authorization", `Bearer ${userTokenInstance.token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.include.keys(["data"]);
    expect(res.body).to.not.include.keys(["error"]);
    expect(res.body.data).to.include.keys(["token"]);
    expect(res.body.data.token).to.be.a("string");
  });
});
