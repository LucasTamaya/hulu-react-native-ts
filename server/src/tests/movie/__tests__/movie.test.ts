import supertest from "supertest";

import {
  getSavedMoviesEmptyListPayload,
  getSavedMoviesPayload,
  userNotFoundPayload,
  mockSavedMovies,
  saveMoviePayload,
  unsaveMoviePayload,
} from "./../data";
import { registerUserInput } from "./../../user/data";
import { createServer } from "./../../../app";
import {
  closeDatabase,
  clearDatabase,
  connectDatabase,
} from "./../../config/db-handler";
import * as FetchMovies from "../../../helpers/fetchSavedMovies";

const app = createServer();

// connexion à une nouvelle base de donnée in-memory avant chaque test
beforeAll(async () => {
  await connectDatabase();
});

beforeEach(async () => {
  // jest.clearAllMocks();
  // crée un utilisateur avant chaque test
  //   await supertest(app).post("/register").send(registerUserInput);
});

// réinitialise la base de donnée après chaque test
afterEach(async () => {
  await clearDatabase();
});

// supprime et ferme la base de donnée et le serveur
afterAll(async () => {
  await closeDatabase();
});

describe("Movie Controller", () => {
  it("should saves a movie with a given ID", async () => {
    // crée un utilisateur avant le test
    const { body: registerBody } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    // récupère le userId
    const userId: string = registerBody.userId;

    // crée un movieId random
    const movieId: number = 5014;

    const { statusCode, body } = await supertest(app)
      .post(`/save-movie/${userId}`)
      .send({ movieId });

    expect(statusCode).toBe(200);
    expect(body).toEqual(saveMoviePayload);
  });

  it("should not saves a movie if the user doesn't exists", async () => {
    // crée un user id qui n'existe pas
    const randomUserId: number = 12345;

    // crée un movieId random
    const movieId: number = 456;

    const { statusCode, body } = await supertest(app)
      .post(`/save-movie/${randomUserId}`)
      .send({ movieId });

    expect(statusCode).toBe(200);
    expect(body).toEqual(userNotFoundPayload);
  });

  it("should unsaves a movie with a given ID", async () => {
    const { body: registerBody } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const userId = registerBody.userId;

    const movieId = 5014;

    // sauvegarde un film
    await supertest(app).post(`/save-movie/${userId}`).send({ movieId });

    // test pour retirer le film ajouté ci-dessus
    const { statusCode, body } = await supertest(app)
      .post(`/unsave-movie/${userId}`)
      .send({ movieId });

    expect(statusCode).toBe(200);
    expect(body).toEqual(unsaveMoviePayload);
  });

  it("should not unsaves a movie if the user doesn't exists", async () => {
    // crée un user id qui n'existe pas
    const randomUserId: number = 12345;

    // crée un movieId random
    const movieId: number = 456;

    const { statusCode, body } = await supertest(app)
      .post(`/unsave-movie/${randomUserId}`)
      .send({ movieId });

    expect(statusCode).toBe(200);
    expect(body).toEqual(userNotFoundPayload);
  });

  it("should returns a list of saved movies if there are any", async () => {
    jest
      .spyOn(FetchMovies, "fetchSavedMovies")
      .mockReturnValueOnce(mockSavedMovies);

    const { body: registerBody } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const userId = registerBody.userId;

    const movieId = 5014;

    // sauvegarde un film
    await supertest(app).post(`/save-movie/${userId}`).send({ movieId });

    const { statusCode, body } = await supertest(app).get(
      `/saved-movies/${userId}`
    );

    expect(statusCode).toBe(200);
    expect(body).toEqual(getSavedMoviesPayload);
    expect(body.savedMovies).toHaveLength(3);
  });

  it("should returns an empty list if there are no saved movies", async () => {
    const { body: registerBody } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const userId = registerBody.userId;

    // on ne sauvegarde aucun film

    const { statusCode, body } = await supertest(app).get(
      `/saved-movies/${userId}`
    );

    expect(statusCode).toBe(200);
    expect(body).toEqual(getSavedMoviesEmptyListPayload);
  });

  it("should throw an error if the user doesn't exists", async () => {
    const randomUserId = 12345;

    const { body } = await supertest(app).get(`/saved-movies/${randomUserId}`);

    expect(body).toEqual(userNotFoundPayload);
  });
});
