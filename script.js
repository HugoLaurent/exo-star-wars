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

  console.log(personData);
  console.log(vehicleData);
  console.log(planetData);

  spanPerson.textContent = personData.count;
  spanVehicle.textContent = vehicleData.count;
  spanPlanet.textContent = planetData.count;
}

getStats();
