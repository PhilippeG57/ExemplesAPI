// faire pour le filtre de recherche
let dataArray;

async function getUsers() {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?nat=fr&results=50"
    );


    // sans destructuring on récupère un objet avec une propriété results
    // const  results2  = await response.json();
    //extraire les données de l'objet
    // const results = results2.results;
// avec destructuring on récupère directement les résultats de l'api
    const { results } = await response.json();
    // console.log(results);
    orderList(results);
    // faire pour le filtre de recherche
    dataArray = results;
    createUserList(dataArray);
  } catch (error) {
    console.log(error);
  }
}
getUsers();

// fonction pour trier les données par ordre alphabétique
function orderList(data) {
  data.sort((a, b) => {
    if (a.name.last < b.name.last) {
      // si a est plus petit que b, on renvoie -1 a est placé avant b
      return -1;
      // si a est plus grand que b, on renvoie 1 a est placé après b
    } else if (a.name.last > b.name.last) {
      return 1;
      // si les deux sont égaux on renvoie 0 ils sont placés dans l'ordre d'arrivée
    } else {
      return 0;
    }
  });
}

const tableResults = document.querySelector(".table-results");

function createUserList(array) {
  array.forEach(user => {
    const listItem = document.createElement("li");
    listItem.className = "table-item";

    listItem.innerHTML = `
      <p class="main-info">
        <img
          src=${user.picture.thumbnail}
          alt="avatar picture"
        />
        <span>${user.name.last} ${user.name.first}</span>
      </p>
      <p class="email">${user.email}</p>
      <p class="phone">${user.phone}</p>

    `;
    tableResults.appendChild(listItem);
  });
}

const searchInput = document.querySelector("#search");

searchInput.addEventListener("input", filterData) // on écoute l'événement input permet de récupérer la valeur de l'input à chaque fois qu'on tape une touche

function filterData(e) {
  // Vide la liste à chaque fois qu'on tape une touche
  tableResults.textContent = "";

  // on enlève les espaces et on met tout en minuscule
  const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

  // faire d'abord ce filtre et montrer que ca ne fonctionne que pour le prenom
// const filteredArr2 = dataArray.filter(userData => userData.name.first.toLowerCase().includes(searchedString));

  const filteredArr = dataArray.filter(userData => searchForOccurences(userData))

  function searchForOccurences(userData){
    // tous les type de recherche 
    const searchTypes = {
      firstname: userData.name.first.toLowerCase(),
      lastName: userData.name.last.toLowerCase(),
      // rechercher nom et prénom en même temps
      firstAndLast : `${userData.name.first + userData.name.last}`.toLowerCase(),
      lastAndFirst : `${userData.name.last + userData.name.first}`.toLowerCase(),
    }
    for(const prop in searchTypes) {
  
      if(searchTypes[prop].includes(searchedString)) {
        // Si true renvoi ma valeur courante dans filteredArr
        return true;
      }
    }
  }

  createUserList(filteredArr)
}