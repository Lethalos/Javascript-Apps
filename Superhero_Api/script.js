const TOKEN = 1472319469900306;
const BASE_URL = `https://www.superheroapi.com/api.php/${TOKEN}`;

const randomHeroButton = document.getElementById("randomHeroButton");
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const heroImageDiv = document.getElementById("heroImage");
const heroNameDiv = document.getElementById("heroName");
const heroStatsDiv = document.getElementById("heroStats");

const getRandomSuperhero = (id) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      const hero = json;
      setHeroName(hero.name);
      setHeroImage(hero.image);
      setHeroStats(hero);
    });
};

const getSearchedSuperhero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.response == "error") {
        alert("Hero not found!");
        return;
      }

      const hero = json.results[0];
      setHeroName(hero.name);
      setHeroImage(hero.image);
      setHeroStats(hero);
    });
};

randomHeroButton.onclick = () => {
  const randomNum = Math.floor(Math.random() * 731) + 1;
  getRandomSuperhero(randomNum);
};

searchButton.onclick = () => {
  if (searchInput.value == "") {
    alert("Please type a hero name");
    return;
  }

  getSearchedSuperhero(searchInput.value);
};

const setHeroName = (heroName) => {
  heroNameDiv.innerHTML = `<h2>${heroName}</h2>`;
};

const setHeroImage = (image) => {
  heroImageDiv.innerHTML = `<img src="${image.url}" height="200" width="200"/>`;
};

const statToEmoji = {
  intelligence: "🧠",
  strength: "🏋️",
  speed: "💨",
  durability: "🏃‍♂️",
  power: "💪",
  combat: "🥋",
};

const setHeroStats = (hero) => {
  const statsHTML = Object.keys(hero.powerstats).map((stat) => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${
      hero.powerstats[stat]
    }</p>`;
  });

  heroStatsDiv.innerHTML = statsHTML.join("");
};
