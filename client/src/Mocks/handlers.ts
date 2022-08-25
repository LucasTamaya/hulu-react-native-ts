import { rest } from "msw";

import { TMDB_API_KEY } from "@env";

import { IMovieData } from "../interfaces";

const searchInput = "La soupe aux choux";

export const handlers = [
  rest.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${searchInput}&page=1&include_adult=false`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          page: 1,
          results: [
            {
              adult: false,
              backdrop_path: "/ml1cXQaoou7pNXxRl5V85UAts0q.jpg",
              genre_ids: [35, 878],
              id: 9317,
              media_type: "movie",
              original_language: "fr",
              original_title: "La Soupe aux choux",
              overview:
                "Au hameau de Gourdifflots, en plein Bourbonnais, deux paysans retraités, « le Glaude » et « le Bombé », se tiennent volontairement à l’écart du monde extérieur, plus occupés à faire bombance et à honorer la dive bouteille qu’à se soucier de la marche du siècle. Un soir, après bien des excès alimentaires et un formidable concours de pets, ils voient avec étonnement une soucoupe volante se poser dans leur jardin. Le Glaude accueille comme un vieil ami le curieux et débonnaire extraterrestre et lui offre un peu de sa fameuse soupe aux choux, si délectable que « la Denrée », surnom de l’extraterrestre, va fidèlement revenir, conquis par le goût exquis du potage…",
              popularity: 12.576,
              poster_path: "/3Eym65PSArfU89O15Cct0JiaPHl.jpg",
              release_date: "1981-12-02",
              title: "La Soupe aux choux",
              video: false,
              vote_average: 6.3,
              vote_count: 709,
            },
          ],
          total_pages: 1,
          total_results: 1,
        })
      );
    }
  ),
];
