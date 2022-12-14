import { render } from "@testing-library/react-native";
import { rest } from "msw";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { allMovies } from "./fakeData";

export const handlers = [
  rest.get("*/trending*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        // ici, je simule les données que je reçois par un tableau contenant 20 éléments
        results: allMovies,
      })
    );
  }),
  rest.get("*/search/multi*", (req, res, ctx) => {
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
    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        details: "Connexion réussie",
        userId: 1,
        savedFilmIds: [],
      })
    );
  }),

  rest.post("*/register", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        details: "Compte crée avec succès",
        userId: 1,
        savedFilmIds: [],
      })
    );
  }),

  rest.get("*/saved-movies*", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        savedMovies: allMovies,
      })
    );
  }),
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
