// Import stations from external module
import { stations } from "./stations.js";
console.log(`Stations array loaded correctly`, stations);

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "bc57c86f4780bd0a66fb3db181b3f031"; // Replace this with your actual OpenWeatherMap API key
  const buttonContainer = document.getElementById("buttonContainer");
  const activateSoundsButton = document.getElementById("activateSounds");
  const deactivateSoundsButton = document.getElementById("deactivateSounds");

  let soundsActivated = false;

  // Activate sound button logic
  activateSoundsButton.addEventListener("click", () => {
    soundsActivated = true;
    activateSoundsButton.style.display = "none";
    deactivateSoundsButton.style.display = "inline-block";
  });

  // Deactivate sound button logic
  deactivateSoundsButton.addEventListener("click", () => {
    soundsActivated = false;
    deactivateSoundsButton.style.display = "none";
    activateSoundsButton.style.display = "inline-block";
  });

  // Create hover and click sound elements
  const hoverSound = new Audio("audio/A.mp3");
  const clickSound = new Audio("audio/B.mp3");
  hoverSound.volume = 0.5;
  clickSound.volume = 0.5;

  // Define the fetchWeather function
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
        const iconCode = data.weather[0].icon;

        // Update weather info in the button
        weatherInfo.innerHTML = `
          <div class="weather-container">
            <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon" class="weather-icon" />
            <div class="weather-text">Temp: ${temp}°F<br>${description}</div>
          </div>
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

  // Function to update the time in each station button
  function updateTime(index, timeZone) {
    const date = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timeZone,
      timeZoneName: "short",
    };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    const formattedDate = date.toLocaleDateString("en-US", { timeZone });
    const dateTimeLabel = document.getElementById(`dateTime${index}`);
    if (dateTimeLabel) {
      dateTimeLabel.innerText = `${formattedDate} ${formattedTime}`;
    }
  }

  // Function to update population and toggle lights
  function updatePopulation(station, index) {
    const populationLabel = document.querySelector(`#population${index}`);
    const redLights = document.querySelectorAll(`#red-light-${index}`);
    const greenLights = document.querySelectorAll(`#green-light-${index}`);

    if (!populationLabel || !redLights.length || !greenLights.length) {
      console.error("Unable to find elements for population update");
      return;
    }

    // Simulate population growth
    const newPopulation = Math.floor(
      station.initialPopulation * (1 + station.growthRate / 100)
    );
    populationLabel.innerText = `Population: ${newPopulation.toLocaleString()}`;

    // Toggle lights based on certain conditions (simulated alerts)
    if (Math.random() > 0.5) {
      redLights.forEach((light) => light.classList.add("active"));
      greenLights.forEach((light) => light.classList.remove("active"));
    } else {
      redLights.forEach((light) => light.classList.remove("active"));
      greenLights.forEach((light) => light.classList.add("active"));
    }

    // Update the initial population for the next iteration
    station.initialPopulation = newPopulation;
  }

  // Iterate through each station to create buttons and logic
  stations.forEach((station, index) => {
    console.log(`Processing station: ${station.name}`);

    // Create button element for each state
    const button = document.createElement("button");
    button.className = "station-button";
    button.style.backgroundColor = station.color;

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

    // Add state name (station name)
    const stateName = document.createElement("div");
    stateName.className = "station-name";
    stateName.innerText = station.name;
    button.appendChild(stateName);

    // Add population display
    const populationLabel = document.createElement("div");
    populationLabel.className = "population";
    populationLabel.id = `population${index}`;
    populationLabel.innerText = `Population: ${station.initialPopulation.toLocaleString()}`;
    button.appendChild(populationLabel);

    // Create weather display in the button
    const weatherInfo = document.createElement("div");
    weatherInfo.className = "weather-info";
    weatherInfo.id = `weather${index}`;
    weatherInfo.innerText = "Loading...";
    button.appendChild(weatherInfo);

    // Add red and green lights
    for (let i = 0; i < 5; i++) {
      const redLight = document.createElement("div");
      redLight.className = "light red";
      redLight.id = `red-light-${index}-${i}`;
      button.appendChild(redLight);

      const greenLight = document.createElement("div");
      greenLight.className = "light green";
      greenLight.id = `green-light-${index}-${i}`;
      button.appendChild(greenLight);
    }

    // Fetch and display weather data for each city
    fetchWeather(station.capital, index, button);

    // Update the time every second
    updateTime(index, station.timeZone);
    setInterval(() => updateTime(index, station.timeZone), 1000);

    // Update population every 10 seconds and handle the light changes
    setInterval(() => updatePopulation(station, index), 10000);

    // Add sounds when clicking or hovering (using shared sounds)
    button.addEventListener("mouseenter", () => {
      if (soundsActivated) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch((error) => {
          console.log("Hover sound autoplay prevented:", error);
        });
      }
    });

    button.addEventListener("mouseleave", () => {
      if (soundsActivated && !hoverSound.paused) {
        hoverSound.pause();
        hoverSound.currentTime = 0;
      }
    });

    button.addEventListener("click", () => {
      if (soundsActivated) {
        clickSound.currentTime = 0;
        clickSound.play().catch((error) => {
          console.log("Click sound autoplay prevented:", error);
        });
      }
    });

    // Append the button to the container
    buttonContainer.appendChild(button);
  });
});
