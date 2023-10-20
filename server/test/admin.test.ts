import { expect } from "chai";
import supertest from "supertest";
import app from "../src/main";
import { signToken } from "../src/lib/auth";
import User, { publicUserFields } from "../src/models/users.model";
import UserTokenClass from "./lib/token";

let userTokenInstance: UserTokenClass;

async function loadToken() {
  userTokenInstance = await UserTokenClass.createInstance("user1");
}

describe("create user", () => {
  before(loadToken);

  it("should 401 if token is invalid", async () => {
    const res = await supertest(app)
      .post("/admin/users")
      .set("authorization", `Bearer invalidtoken`)
      .send({
        username: "user3",
        password: "password",
      });
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.key("message");
  });

  it("should 409 if username is taken", async () => {
    const res = await supertest(app)
      .post("/admin/users")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
      .send({
        username: "user2",
        password: "password",
      });
    expect(res.statusCode).to.equal(409);
    expect(res.body).to.have.key("message");
  });

  it("should 400 if password is too weak", async () => {
    const res = await supertest(app)
      .post("/admin/users")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
      .send({
        username: "user3",
        password: "weakpw",
      });
    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.key("message");
  });

  it("should 201 return the new user if all inputs are valid", async () => {
    const res = await supertest(app)
      .post("/admin/users")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
      .send({
        username: "user3",
        password: "password",
      });
    console.log(res.body)
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.all.keys(publicUserFields);
  });
});
