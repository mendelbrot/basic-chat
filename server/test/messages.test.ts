import { expect } from "chai";
import supertest from "supertest";
import app from "../src/main";

describe("A simple API endpoint", () => {
  it("should return a specific response from an endpoint", async () => {
    const res = await supertest(app).get("/api/messages");
    expect(res.statusCode).to.equal(200);
    expect(res.body[0]).to.have.all.keys(['id', 'content', 'createdAt', 'updatedAt'])
  });
});
