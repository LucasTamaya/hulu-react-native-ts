import {
  updatePasswordInput,
  updatePasswordInputError,
  updatePasswordPayloadError2,
} from "./../data";
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
  updatePasswordPayload,
  updatePasswordPayloadError,
} from "../data";
import { createServer } from "../../../app";
import * as UserService from "../../../services/userService";
import { logUser, registerUser } from "../../../services/userService";

const app = createServer();

// connexion à une nouvelle base de donnée in-memory avant chaque test
beforeAll(async () => {
  await connectDatabase();
});

beforeEach(() => {
  jest.clearAllMocks();
});

// réinitialise la base de donnée après chaque test
afterEach(async () => {
  await clearDatabase();
});

// supprime et ferme la base de donnée et le serveur
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

  it("should updates the password of the user if the given password is correct", async () => {
    const { body: registerBody } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const { statusCode, body } = await supertest(app)
      .post(`/update-password/${registerBody.userId}`)
      .send(updatePasswordInput);

    expect(statusCode).toBe(200);
    expect(body).toEqual(updatePasswordPayload);
  });

  it("should not updates the password of the user if the given password is incorrect", async () => {
    const { body: registerBody } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const { statusCode, body } = await supertest(app)
      .post(`/update-password/${registerBody.userId}`)
      .send(updatePasswordInputError);

    expect(statusCode).toBe(200);
    expect(body).toEqual(updatePasswordPayloadError);
  });

  it("should throw an error if the user doesn't exists", async () => {
    await supertest(app).post("/register").send(registerUserInput);

    const randomUserId = 12345;

    const { statusCode, body } = await supertest(app)
      .post(`/update-password/${randomUserId}`)
      .send(updatePasswordInput);

    expect(statusCode).toBe(200);
    expect(body).toEqual(updatePasswordPayloadError2);
  });
});
