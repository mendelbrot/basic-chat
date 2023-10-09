import { expect } from "chai";
import supertest from "supertest";
import app from "../src/index";

describe("A simple API endpoint", () => {
  it("should return a specific response from an endpoint", async () => {
    const res = await supertest(app).get("/");
    expect(res.statusCode).to.equal(200);
    expect(res.text).to.equal("HELLO FROM EXPRESS + TS!!!!");
  });
});
