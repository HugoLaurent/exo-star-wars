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

async function getAllPlanets() {
  const arrayPlanet = [];
  for (let i = 1; i <= 6; i++) {
    const planets = await fetch(`https://swapi.dev/api/planets/?page=${i}`);
    const planetsData = await planets.json();
    arrayPlanet.push(...planetsData.results);
  }
  return arrayPlanet;
}

const planetList = document.querySelector(".planet-list");
const nbPlanet = document.querySelector(".nb-planet");
const loader = document.querySelector(".loader-planet-detail");
async function getPlanets() {
  const allPlanet = await getAllPlanets();

  allPlanet.forEach((planet) => {
    const planetItem = document.createElement("li");
    const pPlanetItem = document.createElement("p");
    planetItem.appendChild(pPlanetItem);
    pPlanetItem.textContent = planet.name;
    planetList.appendChild(planetItem);
    const planetDetails = document.createElement("span");
    planetDetails.textContent = planet.terrain;
    planetItem.appendChild(planetDetails);
    loader.style.display = "none";
  });
  nbPlanet.textContent = allPlanet.length + " planets found.";
  const planetName = document.querySelectorAll(".planet-list li");
  const titleDetails = document.querySelector(".div-toggle h2");
  const populationDetails = document.querySelector(".span-population ");
  const diametreDetails = document.querySelector(".div-toggle .diametre span");
  const climatDetails = document.querySelector(".div-toggle .climat span");
  const aimantDetails = document.querySelector(".div-toggle .aimant span");
  const terrainDetails = document.querySelector(".div-toggle .terrain span");
  planetName.forEach((planet) =>
    planet.addEventListener("click", (e) => {
      document.querySelector(".title-toggle").style.display = "none";
      document.querySelector(".div-toggle").style.display = "flex";
      console.log(e.target.textContent);
      const planetSelected = allPlanet.find(
        (item) => item.name === e.target.textContent
      );
      titleDetails.textContent = planetSelected.name;
      populationDetails.textContent = planetSelected.population;
      diametreDetails.textContent = planetSelected.diameter;
      climatDetails.textContent = planetSelected.climate;
      aimantDetails.textContent = planetSelected.population;
      terrainDetails.textContent = planetSelected.terrain;
    })
  );
}

getPlanets();

// ON CHANGE INPUT

const input = document.querySelector(".search-planet");
input.addEventListener("input", (e) => {
  const value = e.target.value;
  const planetName = document.querySelectorAll(".planet-list li");
  planetName.forEach((planet) => {
    if (planet.textContent.toLowerCase().includes(value.toLowerCase())) {
      planet.style.display = "flex";
    } else {
      planet.style.display = "none";
    }
  });
  const pluralOrNot =
    document.querySelectorAll(".planet-list li:not([style='display: none;'])")
      .length > 1
      ? "s"
      : "";
  nbPlanet.textContent =
    document.querySelectorAll(".planet-list li:not([style='display: none;'])")
      .length +
    " planet" +
    pluralOrNot +
    " found.";
});

// OPEN DETAILS LOGIC
