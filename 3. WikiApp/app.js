// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  // gerer si la recherche est vide
  if (input.value === "") {
    errorMsg.textContent = "Wops, veuillez remplir l'input";
    return;
  } else {
    errorMsg.textContent = "";
    // afficher le loader
    loader.style.display = "flex";
    // vider le contenu de la recherche précédente
    resultsDisplay.textContent = "";
    wikiApiCall(input.value);
  }
}

async function wikiApiCall(searchInput) {
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`);

    console.log(response); // pour voir les propriétés, l'un delle est ok qui est un boolean
    // si l'user change l'url de l'api gere l'erreur 404
    if (!response.ok) {
      throw new Error(`${response.status}`);// le throw fais le meme effet que le return
    }

    const data = await response.json(); // converti la json en objet js
    console.log(data); // pour voir les propriétés de l'objet
    createCards(data.query.search);
  } catch (error) {
    // si  il y a une erreur on l'affiche et on cache le loader
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

// Faire les différent cards
function createCards(data) {
  // si il n'ay à pas de correspondance dans la recherche 
  if (!data.length) {
    errorMsg.textContent = "Wopsy, aucun résultat";
    // si pas de résultat on cache le loader
    loader.style.display = "none";
    return;
  }
  data.forEach(el => {
    const url = `https://en.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `
      <h3 class="result-title">
        <a href=${url} target="_blank">${el.title}</a>
      </h3>
      <a href=${url} class="result-link" target="_blank">${url}</a>
      <span class="result-snippet">${el.snippet}</span>
      <br>
    `;
    resultsDisplay.appendChild(card);
  });
  // on cache le loader quand on a fini de créer les cards
  loader.style.display = "none";
}
