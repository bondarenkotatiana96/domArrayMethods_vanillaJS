// Variables
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const double = document.getElementById("double");
const showMill = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const calculate = document.getElementById("calculate-wealth");

let data = [];

// Functions

// Fetch random user and add money
async function getRandomUser () {
  const res = await fetch(`https://randomuser.me/api`);
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    wealth: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);
};

// Add the new object into data array
function addData(obj) {
data.push(obj);

updateDOM();
};


// Update dom
function updateDOM(providedData = data) {
  // Clear main div
main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

providedData.forEach(person => {
const element = document.createElement("div");
element.classList.add("person");
element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.wealth)}`;
main.appendChild(element);
});
};

// Format money
function formatMoney(number) {
  return "$" + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

// Double everyone's money
function doubleMoney() {
data = data.map(user => {
  return {...user, wealth: user.wealth * 2};
});
updateDOM();
};

// Sorts users by richest
function sortByMoney() {
data.sort((a, b) => b.wealth - a.wealth);
updateDOM();
};

// Filter only millioners

function showMillionaries() {
data = data.filter(user => user.wealth > 1000000);
updateDOM();
};

// Calculates wealth of all people

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.wealth), 0);
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthElement);
};

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortByMoney);
showMill.addEventListener("click", showMillionaries);
calculate.addEventListener("click", calculateWealth);

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string

// https://randomuser.me/api