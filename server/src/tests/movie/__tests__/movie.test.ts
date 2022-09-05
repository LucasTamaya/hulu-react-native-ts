import supertest from "supertest";

import { saveMoviePayload, unsaveMoviePayload } from "./../data";
import { registerUserInput } from "./../../user/data";
import { createServer } from "./../../../app";
import {
  closeDatabase,
  clearDatabase,
  connectDatabase,
} from "./../../config/db-handler";
import User from "../../../models/User";

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
    const userId = registerBody.userId;

    // crée un movieId random
    const movieId = 5014;

    const { statusCode, body } = await supertest(app)
      .post(`/save-movie/${userId}`)
      .send({ movieId });

    expect(statusCode).toBe(200);
    expect(body).toEqual(saveMoviePayload);
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

  it("should returns a list of saved movies if there are any", async () => {
    const { body: registerBody } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const userId = registerBody.userId;

    const movieId = 5014;

    // sauvegarde un film
    await supertest(app).post(`/save-movie/${userId}`).send({ movieId });

    // récupère la liste de films sauvegardés de l'utilisateur crée ci-dessus
    const { savedMovieIds } = await User.findById(userId);

    expect(savedMovieIds).toContain(movieId);
  });

  it("should returns an empty list if there are no saved movies", async () => {
    const { body: registerBody } = await supertest(app)
      .post("/register")
      .send(registerUserInput);

    const userId = registerBody.userId;

    // on ne sauvegarde aucun film

    // récupère la liste de films sauvegardés de l'utilisateur crée ci-dessus
    const { savedMovieIds } = await User.findById(userId);

    expect(savedMovieIds).toHaveLength(0);
  });
});
