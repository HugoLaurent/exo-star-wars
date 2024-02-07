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
  console.log(allPlanet);

  allPlanet.forEach((planet) => {
    const planetItem = document.createElement("li");
    planetItem.textContent = planet.name;
    planetList.appendChild(planetItem);
    const planetDetails = document.createElement("span");
    planetDetails.textContent = planet.terrain;
    planetItem.appendChild(planetDetails);
    loader.style.display = "none";
  });
  nbPlanet.textContent = allPlanet.length + " planets found.";
}

getPlanets();

// ON CGHANGE INPUT

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
