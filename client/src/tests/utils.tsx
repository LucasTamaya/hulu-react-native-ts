import { render } from "@testing-library/react-native";
import { rest } from "msw";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import requests from "../../assets/data/movieRequests";
import { allMovies } from "./fakeData";

export const handlers = [
  rest.get("*/trending/*", (req, res, ctx) => {
    console.log("je suis dans le premier handler");
    return res(
      ctx.status(200),
      ctx.json({
        // ici, je simule les données que je reçois par un tableau contenant 20 éléments
        results: allMovies,
      })
    );
  }),
  rest.get("*/search/multi*", (req, res, ctx) => {
    console.log("je suis dans le 2eme handler");
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            id: 9317,
            original_title: "Film Title",
            overview: "Film description",
            poster_path: "/film_poster_path.jpg",
            release_date: "1981-12-02",
            title: "Film Title",
            vote_count: 100,
          },
        ],
      })
    );
  }),
  rest.post("*/login", (req, res, ctx) => {
    console.log("je suis dans le login");
    console.log(req.text());
    return res(
      ctx.status(200),
      ctx.json({
        email: "john.doe@orange.fr",
        password: [],
      })
    );
  }),
  // MODIFIDER MON PROJET ET FAIRE EN SORTE QUE CE SOIT MON BACKEND QUI FASSE LES REQUETES API VERS TMDB
  // rest.get("*/3/movie/*", (req, res, ctx) => {
  //   console.log("je suis dans le 3eme handler");
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       results: allMovies,
  //     })
  //   );
  // }),
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
