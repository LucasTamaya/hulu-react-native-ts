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
  registerPayloadError,
  loginUserInput,
  loginUserInputError,
  loginPayload,
  loginPayloadError,
} from "../data";
import { createServer } from "../../../app";
import * as UserService from "../../../services/userService";
import { logUser, registerUser } from "../../../services/userService";

const app = createServer();

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await connectDatabase();
});

beforeEach(() => {
  jest.clearAllMocks();
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
  it("should register a new user if it doesn't exists", async () => {
    jest.spyOn(UserService, "registerUser");

    const { statusCode, body } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const { name, email, password } = registerUserInput;

    expect(statusCode).toBe(200);
    expect(omit(body, ["userId"])).toEqual(registerPayload);

    expect(registerUser).toHaveBeenCalledTimes(1);
    expect(registerUser).toHaveBeenCalledWith(name, email, password);
  });

  it("should not register a new user if it already exists", async () => {
    jest.spyOn(UserService, "registerUser");

    await supertest(app).post("/register").send(registerUserInput);

    const { statusCode, body } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const { name, email, password } = registerUserInput;

    expect(statusCode).toBe(200);
    expect(omit(body, ["userId"])).toEqual(registerPayloadError);

    expect(registerUser).toHaveBeenCalledTimes(2);
    expect(registerUser).toHaveBeenCalledWith(name, email, password);
  });

  it("should log the user if it exists and if the password is correct", async () => {
    jest.spyOn(UserService, "logUser");

    // crée d'abord l'utilisateur
    await supertest(app).post("/register").send(registerUserInput);

    const { statusCode, body } = await supertest(app)
      .post("/login")
      .send(loginUserInput);

    const { email, password } = loginUserInput;

    expect(statusCode).toBe(200);
    // teste l'ensemble des propriétés sauf 'userId' car celui-ci sera toujours aléatoire
    // en 2e option, on pourrait mocker les propriétés retour afin de générer toujours le meme userId
    expect(omit(body, ["userId"])).toEqual(loginPayload);

    expect(logUser).toHaveBeenCalledTimes(1);
    expect(logUser).toHaveBeenCalledWith(email, password);
  });

  it("should not log the user if the password is incorrect", async () => {
    jest.spyOn(UserService, "logUser");

    // crée d'abord l'utilisateur
    await supertest(app).post("/register").send(registerUserInput);

    const { statusCode, body } = await supertest(app)
      .post("/login")
      .send(loginUserInputError);

    const { email, password } = loginUserInputError;

    expect(statusCode).toBe(200);
    expect(omit(body, ["userId"])).toEqual(loginPayloadError);

    expect(logUser).toHaveBeenCalledTimes(1);
    expect(logUser).toHaveBeenCalledWith(email, password);
  });

  it("should not log the user if it doesn't exists", async () => {
    jest.spyOn(UserService, "logUser");

    const { statusCode, body } = await supertest(app)
      .post("/login")
      .send(loginUserInputError);

    const { email, password } = loginUserInputError;

    expect(statusCode).toBe(200);
    expect(omit(body, ["userId"])).toEqual(loginPayloadError);

    expect(logUser).toHaveBeenCalledTimes(1);
    expect(logUser).toHaveBeenCalledWith(email, password);
  });
});
