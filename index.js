// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// all necessary DOM elements needed
const button = document.getElementById("fetch-alerts");
const input = document.getElementById("state-input");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// listening for button clicks, initiating the whole flow
button.addEventListener("click", async () => {
  const state = input.value.trim();

  if (!/^[A-Z]{2}$/.test(state)) {
    errorMessage.textContent = "Please enter a valid two-letter state abbreviation (e.g. CA, TX).";
    errorMessage.classList.remove("hidden");
    input.value = "";
    return; // stop fetch request
  }  
  input.value = "";

  await fetchWeatherAlerts(state);
});

// async function while we wait
async function fetchWeatherAlerts(state) {
  try {
    // pauses until the response arrives
    const response = await fetch(`${weatherApi}${state}`);
 
    // await the JSON conversion
    const data = await response.json();
 
    // hide and clear any previous error on a successful request
    errorMessage.classList.add("hidden");
    errorMessage.textContent = "";
 
    displayAlerts(data);
 
  } catch (error) {
    // if the try block fails, we land here
    // show the error message and remove the hidden class
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }
} // i love try/catch, its the goat

// update the DOM with alert data
function displayAlerts(data) {
  // clear previous results
  alertsDisplay.innerHTML = "";
 
  // summary line showing total alert count
  const summary = document.createElement("p");
  summary.textContent = `Weather Alerts: ${data.features.length}`;
  alertsDisplay.appendChild(summary);
 
  // render each alert headline as its own paragraph
  data.features.forEach((feature) => {
    const p = document.createElement("p");
    p.textContent = feature.properties.headline;
    alertsDisplay.appendChild(p);
  });
}