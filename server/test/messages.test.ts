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
    console.log('user1Token', user1Token)
  });

  it("should return a list of messages", async () => {
    const res = await supertest(app).get("/api/messages")
    .set('Authorization', `Bearer ${user1Token}`)
    expect(res.statusCode).to.equal(200);
    expect(res.body[0]).to.have.all.keys([
      "id",
      "content",
      "createdAt",
      "updatedAt",
    ]);
  });
});