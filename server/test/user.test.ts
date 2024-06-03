import { expect } from "chai";
import supertest from "supertest";
import app from "../src/main";
import UserTokenClass from "./lib/token";
import { publicUserFields } from "../src/models/users.model";

let userTokenInstance: UserTokenClass;

async function loadToken() {
  userTokenInstance = await UserTokenClass.createInstance("user1");
}

describe("create user", () => {
  before(loadToken);

  it("should 401 if token is invalid", async () => {
    const res = await supertest(app)
      .post("/api/users")
      .set("authorization", `Bearer invalidtoken`)
      .send({
        username: "user3",
        password: "password",
      });
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.key("error");
  });

  it("should 409 if username is taken", async () => {
    const res = await supertest(app)
      .post("/api/users")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
      .send({
        username: "user2",
        password: "password",
      });
    expect(res.statusCode).to.equal(409);
    expect(res.body).to.have.key("error");
  });

  it("should 400 if password is too weak", async () => {
    const res = await supertest(app)
      .post("/api/users")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
      .send({
        username: "user3",
        password: "weakpw",
      });
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.key("error");
  });

  it("should 201 return the new user", async () => {
    const res = await supertest(app)
      .post("/api/users")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
      .send({
        username: "user3",
        password: "password",
      });
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.keys(publicUserFields);
  });
});

describe("get me", () => {
  before(loadToken);

  it("should get the current user", async () => {
    const res = await supertest(app)
      .get("/api/users/me")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.keys(publicUserFields);
  });
});

describe("get users", () => {
  before(loadToken);

  it("should 200 return a list of users", async () => {
    const res = await supertest(app)
      .get("/api/users")
      .set("authorization", `Bearer ${userTokenInstance.token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body[0]).to.have.keys(publicUserFields);
    expect(res.body[0]).to.not.have.key("password")
  });
});
