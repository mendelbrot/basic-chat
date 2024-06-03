import { expect } from "chai";
import supertest from "supertest";
import app from "../src/main";
import UserTokenClass from "./lib/token";
import { publicMessageFields } from "../src/models/messages.model";

let userTokenInstance: UserTokenClass;

async function loadToken() {
  userTokenInstance = await UserTokenClass.createInstance("user1");
}

describe("get messages", () => {
  before(loadToken);

  it("should 401 if token is invalid", async () => {
    const res = await supertest(app)
      .get("/api/messages")
      .set("authorization", `Bearer invalidtoken`);
    expect(res.statusCode).to.equal(401);
    expect(res.body).to.have.key("error");
  });

  it("should 200 return a list of messages", async () => {
    const res = await supertest(app)
      .get("/api/messages")
      .set("authorization", `Bearer ${userTokenInstance.token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body[0]).to.have.keys(publicMessageFields);
  });
});

describe("post message", () => {
  before(loadToken);

  it("should 201 return the created message", async () => {
    const messageContent = "Hi there!!!";
    const res = await supertest(app)
      .post("/api/messages")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
      .send({ content: messageContent });
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.keys(publicMessageFields);
    expect(res.body.userId).to.equal(userTokenInstance.user.id);
    expect(res.body.content).to.equal(messageContent);
  });
});
