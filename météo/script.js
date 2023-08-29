const ville = {
    nom: "Paris"
  };
  
  recevoirTemperature(ville.nom);
  
  const changerDeVille = document.querySelector('.changer');
  changerDeVille.addEventListener('click', () => {
    ville.nom = prompt('Quelle ville souhaitez-vous voir ?');
    recevoirTemperature(ville.nom);
  });
  
  async function recevoirTemperature(ville) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=303f9eec7635d278cf01f88380592743&units=metric`;
    try {
      const response = await axios.get(url);
      const temperature = response.data.main.temp;
      const nomVille = response.data.name;
      console.log(nomVille);
      document.querySelector('.temperature_label').textContent = temperature;
      document.querySelector('.ville').textContent = nomVille;
    } catch (error) {
      alert('Un problème est intervenu, merci de revenir plus tard.');
      console.error(error);
    }
  }
  
