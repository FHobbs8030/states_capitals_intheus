import { stations } from "./stations.js";
console.log(`Stations array loaded correctly`, stations); // Debugging step to verify if all stations are loaded

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "bc57c86f4780bd0a66fb3db181b3f031"; // Replace this with your actual OpenWeatherMap API key
  const buttonContainer = document.getElementById("buttonContainer");
  const activateSoundsButton = document.getElementById("activateSounds");

  let soundsActivated = false;

  // Add click event listener to activate sounds button
  activateSoundsButton.addEventListener("click", () => {
    soundsActivated = true;

    // Play each sound muted to get browser permission
    const hoverSound = new Audio("audio/A.mp3");
    const clickSound = new Audio("audio/B.mp3");

    hoverSound.volume = 0;
    clickSound.volume = 0;

    hoverSound.play().catch((error) => {
      console.log("Muted hover sound playback prevented:", error);
    });

    clickSound.play().catch((error) => {
      console.log("Muted click sound playback prevented:", error);
    });

    // Hide the activation button after it's clicked
    activateSoundsButton.style.display = "none";
  });

  // Create hover and click sound elements (shared across all buttons)
  const hoverSound = new Audio("audio/A.mp3");
  const clickSound = new Audio("audio/B.mp3");
  hoverSound.volume = 0.5;
  clickSound.volume = 0.5;

  // Define the fetchWeather function with icons and color-coded backgrounds
  function fetchWeather(city, index, button) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const weatherInfo = document.getElementById(`weather${index}`);
        const temp = data.main.temp.toFixed(1);
        const description = data.weather[0].description.toLowerCase();
        const iconCode = data.weather[0].icon; // Get the weather icon code
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Update weather info in the button with icon and temperature
        weatherInfo.innerHTML = `
          <img src="${iconUrl}" alt="${description}" class="weather-icon">
          Temp: ${temp}°F<br>${description}
        `;

        // Adjust button background color based on weather conditions
        if (
          description.includes("thunderstorm") ||
          description.includes("rain") ||
          description.includes("snow")
        ) {
          button.style.filter = "brightness(50%)"; // Darken the button for bad weather
        } else if (description.includes("clouds")) {
          button.style.filter = "brightness(75%)"; // Slightly darken for cloudy weather
        } else if (temp < 32) {
          button.style.filter = "brightness(60%)"; // Darken for freezing temperatures
        } else {
          button.style.filter = "brightness(100%)"; // Reset to original brightness for clear weather
        }
      })
      .catch((error) => {
        console.error(`Failed to fetch weather data for ${city}:`, error);
      });
  }

  // Iterate through each station to create buttons and logic
  stations.forEach((station, index) => {
    console.log(`Processing station: ${station.name}`); // Debug to see if all stations are processed

    // Create button element for each state
    const button = document.createElement("button");
    button.className = "station-button";
    button.style.backgroundColor = station.color;

    // Add state name (station name)
    const stateName = document.createElement("div");
    stateName.className = "station-name";
    stateName.innerText = station.name;
    button.appendChild(stateName);

    // Add capital name
    const capitalLabel = document.createElement("div");
    capitalLabel.className = "capital";
    capitalLabel.innerText = station.capital;
    button.appendChild(capitalLabel);

    // Add the date/time
    const dateTimeLabel = document.createElement("div");
    dateTimeLabel.className = "date-time";
    dateTimeLabel.id = `dateTime${index}`;
    button.appendChild(dateTimeLabel);

    // Create a light container for the red light and population
    const lightContainer = document.createElement("div");
    lightContainer.className = "light-container";

    // Create the red light (left, near the population)
    const redLight = document.createElement("div");
    redLight.className = "light red";
    lightContainer.appendChild(redLight);

    // Add population display next to the red light
    const populationLabel = document.createElement("div");
    populationLabel.className = "population";
    populationLabel.innerText = `Population: ${station.initialPopulation.toLocaleString()}`;
    lightContainer.appendChild(populationLabel);

    // Append the light container with red light and population
    button.appendChild(lightContainer);

    // Create a green light wrapper to position it on the right
    const greenLightWrapper = document.createElement("div");
    greenLightWrapper.className = "green-light-wrapper";

    // Create the green light (right, far right side of the button)
    const greenLight = document.createElement("div");
    greenLight.className = "light green";
    greenLightWrapper.appendChild(greenLight);

    // Append the green light wrapper to the button (far right)
    button.appendChild(greenLightWrapper);

    // Create weather display in the button (top-right corner)
    const weatherInfo = document.createElement("div");
    weatherInfo.className = "weather-info";
    weatherInfo.id = `weather${index}`;
    weatherInfo.innerText = "Loading..."; // Placeholder text until data is fetched
    button.appendChild(weatherInfo);

    // Fetch and display weather data for each city, and adjust the button color
    fetchWeather(station.capital, index, button);

    // Add sounds when clicking or hovering (using shared sounds)
    button.addEventListener("mouseenter", () => {
      if (soundsActivated) {
        hoverSound.currentTime = 0; // Reset to the beginning
        hoverSound.play().catch((error) => {
          console.log("Hover sound autoplay prevented:", error);
        });
      }
    });

    button.addEventListener("mouseleave", () => {
      if (soundsActivated && !hoverSound.paused) {
        hoverSound.pause(); // Stop playing
        hoverSound.currentTime = 0; // Reset for next hover
      }
    });

    button.addEventListener("click", () => {
      if (soundsActivated) {
        clickSound.currentTime = 0; // Reset to the beginning
        clickSound.play().catch((error) => {
          console.log("Click sound autoplay prevented:", error);
        });
      }
    });

    // Append the button to the container
    buttonContainer.appendChild(button);
  });
});
