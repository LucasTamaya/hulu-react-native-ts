//recuperer la valeur de l'input

let inputRecherche = document.getElementById("rechercheInput");
let grid = document.querySelector(".grid");

// recupere ce qu'on tape dans l'input
inputRecherche.addEventListener("keyup", () => {
  if (grid.children) {
    grid.removeChild();
  } else {
    // tu crées les éléments
  }
  const series = fetchEtCreationContenu();
  series.map((serie) => {
    let div = document.createElement("div");
    let nomSerie = document.createElement("h2");
    nomSerie.innerHTML = serie.results[i].name;
    div.appendChild(nomSerie);
    grid.appendChild(div);
  });
});

// fonction fetch avec la creation
function fetchEtCreationContenu() {
  const input = inputRecherche.value;
  const tableau = [];
  fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=3341d636ea5e718cbe535387f5416379&language=fr&page=1&query=${input}&include_adult=false`
  )
    .then((reponse) => reponse.json())
    .then((data) => {
      for (let i = 0; i < 10; i++) {
        tableau.push(data.results[i].name);
      }
      return tableau;
    });
}
