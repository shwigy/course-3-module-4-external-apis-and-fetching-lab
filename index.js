// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
// all necessary DOM elements needed
const button = document.getElementById("fetch-alerts");
const input = document.getElementById("state-input");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// listening for button clicks, initiating the whole flow
button.addEventListener("click", () => {
  const state = input.value.trim();

  input.value = "";

  fetchWeatherAlerts(state);
});