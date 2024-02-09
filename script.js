const spanPerson = document.querySelector(".person-section span");
const spanVehicle = document.querySelector(".travel-section span");
const spanPlanet = document.querySelector(".planet-section span");

async function getStats() {
  const person = await fetch("https://swapi.dev/api/people/");
  const vehicle = await fetch("https://swapi.dev/api/vehicles/");
  const planet = await fetch("https://swapi.dev/api/planets/");
  const personData = await person.json();
  const vehicleData = await vehicle.json();
  const planetData = await planet.json();

  spanPerson.textContent = personData.count;
  spanVehicle.textContent = vehicleData.count;
  spanPlanet.textContent = planetData.count;
}

getStats();

// PLANET PAGE JS
const planetList = document.querySelector(".planet-list");
const nbPlanet = document.querySelector(".nb-planet");
const loader = document.querySelector(".loader-planet-detail");
const input = document.querySelector(".search-planet");
const select = document.querySelector("select");
const titleToggle = document.querySelector(".title-toggle");
const divToggle = document.querySelector(".div-toggle");
const titleDetails = document.querySelector(".div-toggle h2");
const populationDetails = document.querySelector(".span-population");
const diametreDetails = document.querySelector(".div-toggle .diametre span");
const climatDetails = document.querySelector(".div-toggle .climat span");
const aimantDetails = document.querySelector(".div-toggle .aimant span");
const terrainDetails = document.querySelector(".div-toggle .terrain span");

let allPlanet;

async function getAllPlanets() {
  const arrayPlanet = [];
  for (let i = 1; i <= 6; i++) {
    const planets = await fetch(`https://swapi.dev/api/planets/?page=${i}`);
    const planetsData = await planets.json();
    arrayPlanet.push(...planetsData.results);
  }
  return arrayPlanet;
}

function createPlanetItem(planet) {
  const planetItem = document.createElement("li");
  const pPlanetItem = document.createElement("p");
  pPlanetItem.textContent = planet.name;
  planetItem.appendChild(pPlanetItem);

  const planetDetails = document.createElement("span");
  planetDetails.textContent = planet.terrain;
  planetItem.appendChild(planetDetails);

  loader.style.display = "none";

  planetItem.addEventListener("click", () => {
    displayPlanetDetails(planet.name);
  });

  return planetItem;
}

function displayPlanetDetails(planetName) {
  titleToggle.style.display = "none";
  divToggle.style.display = "flex";

  const planetSelected = allPlanet.find((item) => item.name === planetName);

  titleDetails.textContent = planetSelected.name;
  populationDetails.textContent = planetSelected.population;
  diametreDetails.textContent = planetSelected.diameter;
  climatDetails.textContent = planetSelected.climate;
  aimantDetails.textContent = planetSelected.population;
  terrainDetails.textContent = planetSelected.terrain;
}

function filterPlanets(value) {
  const planetName = document.querySelectorAll(".planet-list li");
  planetName.forEach((planet) => {
    const displayStyle = planet.textContent
      .toLowerCase()
      .includes(value.toLowerCase())
      ? "flex"
      : "none";
    planet.style.display = displayStyle;
  });

  const visiblePlanetsCount = document.querySelectorAll(
    ".planet-list li:not([style='display: none;'])"
  ).length;
  const pluralOrNot = visiblePlanetsCount > 1 ? "s" : "";
  nbPlanet.textContent = `${visiblePlanetsCount} planet${pluralOrNot} found.`;
}

function handleSelectChange(selectedOption) {
  const filteredPlanets = allPlanet.filter((planet) => {
    const population = parseInt(planet.population);

    if (selectedOption === "small" && population <= 100000) {
      return true;
    } else if (
      selectedOption === "medium" &&
      population > 100000 &&
      population <= 1000000
    ) {
      return true;
    } else if (selectedOption === "big" && population > 1000000) {
      return true;
    } else if (selectedOption === "population") {
      return true;
    }

    return false;
  });

  planetList.innerHTML = "";
  filteredPlanets.forEach((planet) => {
    const planetItem = createPlanetItem(planet);
    planetList.appendChild(planetItem);
  });

  const visiblePlanetsCount = filteredPlanets.length;
  const pluralOrNot = visiblePlanetsCount > 1 ? "s" : "";
  nbPlanet.textContent = `${visiblePlanetsCount} planet${pluralOrNot} found.`;
}

async function getPlanets() {
  allPlanet = await getAllPlanets();

  allPlanet.forEach((planet) => {
    const planetItem = createPlanetItem(planet);
    planetList.appendChild(planetItem);
  });

  nbPlanet.textContent = `${allPlanet.length} planets found.`;
}

getPlanets();

input.addEventListener("input", (e) => {
  filterPlanets(e.target.value);
});

select.addEventListener("change", (e) => {
  handleSelectChange(e.target.value);
});

planetList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    displayPlanetDetails(e.target.textContent);
  }
});
