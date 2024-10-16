// Import the stations array from stations.js
import { stations } from "./stations.js";

// API key for weather data
const API_KEY = "a3e93ebcbeac87320f146f1fe859bf60"; // Replace with your OpenWeatherMap API Key

// Declare the updateTime function ONCE before using it
function updateTime(index, timeZone) {
    const now = luxon.DateTime.now().setZone(timeZone || "UTC");
    const dateTimeLabel = document.getElementById(`dateTime${index}`);
    if (dateTimeLabel) {
        dateTimeLabel.innerHTML = `${now.toFormat("EEE, MMM dd, yyyy")}<br>${now.toFormat("hh:mm:ss a")} (${now.offsetNameShort})`;
    }
}

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const buttonContainer = document.getElementById("buttonContainer");

  // Loop through each station and create buttons + modals
  stations.forEach((station, index) => {
    // Create a button for each station
    const button = document.createElement("button");
    button.className = "station-button";
    button.style.backgroundColor = station.color;
    button.innerHTML = `
      <div class="station-name">${station.name}</div>
      <div class="capital">${station.capital}</div>
      <div id="weather${index}" class="weather-info">Loading...</div>
      <div id="dateTime${index}" class="date-time">Loading time...</div>
      <div class="population">Population: ${station.initialPopulation.toLocaleString()}</div>
    `;

    // Create the modal for each station
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    modalContainer.id = `modal${index}`;

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.innerHTML = `
      <span class="close">&times;</span>
      <h2>Welcome to ${station.capital}, the capital of ${station.name}</h2>
      <p>${station.capital} is known for ${station.knownFor}.</p>
      <p>Population: ${station.initialPopulation.toLocaleString()}</p>
      <p>Time Zone: ${station.timeZone}</p>
      <audio controls>
        <source src="${station.streamUrl}" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
      <button class="modal-btn">Close</button>
    `;

    // Append modal content to the modal container
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // Open the modal when button is clicked
    button.addEventListener("click", () => {
      modalContainer.classList.add("open");
    });

    // Close the modal when 'x' or close button is clicked
    modalContent.querySelector(".close").addEventListener("click", () => {
      modalContainer.classList.remove("open");
    });

    modalContent.querySelector(".modal-btn").addEventListener("click", () => {
      modalContainer.classList.remove("open");
    });

    // Close the modal when clicking outside the content
    window.addEventListener("click", (event) => {
      if (event.target === modalContainer) {
        modalContainer.classList.remove("open");
      }
    });

    // Append the button to the container
    buttonContainer.appendChild(button);
  });
});

    // Fetch weather data immediately and every 15 minutes
    fetchWeather(station.capital, index, button);
    setInterval(() => fetchWeather(station.capital, index, button), 900000); // 15 min interval

    // Update the time every second
    function updateTime(index, timeZone) {
      const now = luxon.DateTime.now().setZone(timeZone || "UTC");
      const dateTimeLabel = document.getElementById(`dateTime${index}`);

      // Check if the element exists before trying to update it
      if (dateTimeLabel) {
        dateTimeLabel.innerHTML = `${now.toFormat(
          "EEE, MMM dd, yyyy"
        )}<br>${now.toFormat("hh:mm:ss a")} (${now.offsetNameShort})`;
      }
    }

    // Population update every 10 seconds
    let lastPopulation = station.initialPopulation;
    const populationLabel = button.querySelector(".population");

    setInterval(() => {
      const newPopulation = (station.initialPopulation +=
        (station.initialPopulation * station.growthRate) / 3153600);
      populationLabel.innerText = `Population: ${Math.floor(
        newPopulation
      ).toLocaleString()}`;
      lastPopulation = newPopulation;
    }, 10000); // Every 10 seconds

    // Append the button to the container only once
    buttonContainer.appendChild(button);

// Fetch weather data for each station
async function fetchWeather(city, index, button) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
    );
    const data = await response.json();

    const temp = data.main.temp.toFixed(1);
    const description = data.weather[0].description.toLowerCase();
    const weatherInfo = document.getElementById(`weather${index}`);
    weatherInfo.innerHTML = `Temp: ${temp}°F<br>${description}`;

    adjustButtonBrightness(button, description, temp);
  } catch (error) {
    console.error(`Failed to fetch weather data for ${city}:`, error);
  }
}

// Adjust button brightness based on weather
function adjustButtonBrightness(button, description, temp) {
  if (
    description.includes("thunderstorm") ||
    description.includes("rain") ||
    description.includes("snow")
  ) {
    button.style.filter = "brightness(50%)"; // Darken for bad weather
  } else if (description.includes("clouds")) {
    button.style.filter = "brightness(75%)"; // Slightly darken for cloudy
  } else if (temp < 32) {
    button.style.filter = "brightness(60%)"; // Darken for freezing
  } else {
    button.style.filter = "brightness(100%)"; // Reset for clear weather
  }
}

// Update the time every second
function updateTime(index, timeZone) {
  const now = luxon.DateTime.now().setZone(timeZone || "UTC");
  const dateTimeLabel = document.getElementById(`dateTime${index}`);
  dateTimeLabel.innerHTML = `${now.toFormat(
    "EEE, MMM dd, yyyy"
  )}<br>${now.toFormat("hh:mm:ss a")} (${now.offsetNameShort})`;
}

// Optional: Load map function (if using maps)
function loadMap(index, capital) {
  const mapElement = document.getElementById(`map${index}`);
  // Use any map API of your choice (e.g., Leaflet, Google Maps, etc.)
  mapElement.innerHTML = `Map loading for ${capital}...`; // Placeholder logic
}
