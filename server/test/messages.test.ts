import { expect } from "chai";
import supertest from "supertest";
import app from "../src/main";
import { signToken } from "../src/lib/auth";
import User from "../src/models/users.model";

let user1Token: string;

describe("messages", () => {
  before(async function () {
    let user1 = await User.findOne({ where: { username: "user1" } });
    user1Token = signToken(user1 as User);
  });

  it("should 401 if authorization token is invalid", async () => {
    const res = await supertest(app).get("/api/messages")
    .set('authorization', `Bearer invalidtoken`)
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.all.keys([
      "message"
    ]);
  });

  it("should return a list of messages", async () => {
    const res = await supertest(app).get("/api/messages")
    .set('authorization', `Bearer ${user1Token}`)
    expect(res.statusCode).to.equal(200);
    expect(res.body[0]).to.have.all.keys([
      "id",
      "content",
      "createdAt",
      "updatedAt",
    ]);
  });
});