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
    expect(res.body).to.not.include.keys(["data"]);
    expect(res.body).to.include.keys(["error"]);
  });

  it("should 200 return a list of messages", async () => {
    const res = await supertest(app)
      .get("/api/messages")
      .set("authorization", `Bearer ${userTokenInstance.token}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.include.keys(["data"]);
    expect(res.body).to.not.include.keys(["error"]);
    expect(res.body.data[0]).to.have.keys(publicMessageFields);
  });
});

describe("post message", () => {
  before(loadToken);

  it("should 201 return the created message", async () => {
    const messageText = "Hi there!!!";
    const res = await supertest(app)
      .post("/api/messages")
      .set("authorization", `Bearer ${userTokenInstance.token}`)
      .send({ text: messageText });
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.include.keys(["data"]);
    expect(res.body).to.not.include.keys(["error"]);
    expect(res.body.data).to.include.keys(publicMessageFields);
    expect(res.body.data.senderId).to.equal(userTokenInstance.user.id);
    expect(res.body.data.text).to.equal(messageText);
  });
});
