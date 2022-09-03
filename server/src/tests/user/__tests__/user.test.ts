import supertest from "supertest";
import { omit } from "lodash";

import {
  connectDatabase,
  closeDatabase,
  clearDatabase,
} from "../../config/db-handler";
import {
  registerUserInput,
  registerPayload,
  loginUserInput,
  loginPayload,
} from "../data";
import { createServer } from "../../../app";
import {
  searchUser,
  createUser,
  passwordValidation,
} from "../../../services/userService";
import * as UserService from "../../../services/userService";

const app = createServer();

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await connectDatabase();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await clearDatabase();
});

// /**
//  * Remove and close the db and server.
//  */
afterAll(async () => {
  await closeDatabase();
});

describe("User Controller", () => {
  it("should register a new user", async () => {
    jest.spyOn(UserService, "searchUser");
    jest.spyOn(UserService, "createUser").mockReturnValueOnce(registerPayload);

    const { statusCode, body } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const { email, name, password } = registerUserInput;

    expect(statusCode).toBe(200);
    expect(body).toEqual(registerPayload);

    expect(searchUser).toHaveBeenCalledTimes(1);
    expect(searchUser).toHaveBeenCalledWith(email);

    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith(name, email, password);
  });

  // it("should log the user if it exists and if the password is correct", async () => {
  //   jest.spyOn(UserService, "searchUser");
  //   jest.spyOn(UserService, "passwordValidation");

  //   await supertest(app).post("/register").send(registerUserInput);

  //   const { statusCode, body } = await supertest(app)
  //     .post("/login")
  //     .send(loginUserInput);

  //   const { email, password } = loginUserInput;

  //   expect(statusCode).toBe(200);
  //   // teste l'ensemble des propriétés sauf 'userId' car celui-ci sera toujours aléatoire
  //   // en 2e option, on pourrait mocker les propriétés retour afin de générer toujours le meme userId
  //   expect(omit(body, ["userId"])).toEqual(loginPayload);

  //   expect(searchUser).toHaveBeenCalledTimes(1);
  //   expect(searchUser).toHaveBeenCalledWith(email);

  //   expect(passwordValidation).toHaveBeenCalledTimes(1);
  // });
});
