// import request from "supertest";

// import { connectDatabase, closeDatabase, clearDatabase } from "./db-handler";
// import app from "../index";

// // Connect to a new in-memory database before running any tests.
// beforeAll(async () => await connectDatabase());

// // Clear all test data after every test.
// afterEach(async () => await closeDatabase());

// // Remove and close the db and server.
// afterAll(async () => await clearDatabase());

// describe("POST /movie/save/:userId", () => {
//   describe("given a correct user id", () => {
//     it("should respond with a 200 status code", async () => {
//       const res = await request(app).get("/movies/saved/:userId");
//       // .post("/movie/save/62f0b7e8fed70c5d4c5cc892")
//       // .send({
//       //   filmId: 19404,
//       // });
//       console.log(res);
//       expect(res.statusCode).toBe(100);
//     });
//   });

//   describe("given an incorrect user id", () => {});
// });

// describe("Test", () => {
//   it("test", () => {
//     expect(true).toBe(true);
//   });
// });
