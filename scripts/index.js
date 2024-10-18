import { stations } from "./stations.js";
console.log(stations);

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "a3e93ebcbeac87320f146f1fe859bf60"; // Replace this with your OpenWeatherMap API key
  const buttonContainer = document.getElementById("buttonContainer");

  console.log(stations); // Check if stations are imported correctly

  // Function to update the time based on the time zone
  function updateTime(index, timeZone) {
    const now = luxon.DateTime.now().setZone(timeZone || "UTC");
    const dateTimeLabel = document.getElementById(`dateTime${index}`);
    dateTimeLabel.innerHTML = `${now.toFormat(
      "EEE, MMM dd, yyyy"
    )}<br>${now.toFormat("hh:mm:ss a")} (${now.offsetNameShort})`;
  }

  // Function to fetch weather data for a given city
  async function fetchWeather(city, index, button) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      );
      const data = await response.json();

      // Get weather info
      const temp = data.main.temp.toFixed(1);
      const description = data.weather[0].description.toLowerCase();

      // Update weather info in the button
      const weatherInfo = document.getElementById(`weather${index}`);
      weatherInfo.innerHTML = `Temp: ${temp}°F<br>${description}`;

      // Adjust button background color based on weather severity
      if (
        description.includes("thunderstorm") ||
        description.includes("rain") ||
        description.includes("drizzle") ||
        description.includes("snow")
      ) {
        button.style.filter = "brightness(50%)"; // Darken the button for bad weather
      } else if (description.includes("clouds")) {
        button.style.filter = "brightness(75%)"; // Slightly darken for cloudy weather
      } else if (temp < 32) {
        // For cold weather
        button.style.filter = "brightness(60%)"; // Darken for freezing temperatures
      } else {
        button.style.filter = "brightness(100%)"; // Reset to original brightness for clear weather
      }
    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error);
    }
  }

  // Iterate through each station to create buttons and logic
  stations.forEach((station, index) => {
    let lastPopulation = station.initialPopulation; // Track the last population value

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

    // Add sounds when clicking or hovering
    const hoverSound = new Audio("audio/A.mp3"); // Correct path to the hover sound
    const clickSound = new Audio("audio/B.mp3"); // Correct path to the click sound

    // Set volume levels for each sound
    hoverSound.volume = 0.1;
    clickSound.volume = 0.1;

    // Play hover sound when mouse enters the button
    button.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0; // Reset to the beginning
      hoverSound.play().catch((error) => {
        console.log("Hover sound autoplay prevented:", error);
      });
    });

    // Stop hover sound when mouse leaves the button
    button.addEventListener("mouseleave", () => {
      hoverSound.pause(); // Stop playing
      hoverSound.currentTime = 0; // Reset for next hover
    });

    // Play click sound when button is clicked
    button.addEventListener("click", () => {
      clickSound.currentTime = 0; // Reset to the beginning
      clickSound.play().catch((error) => {
        console.log("Click sound autoplay prevented:", error);
      });
    });

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

    // Append the button to the container
    buttonContainer.appendChild(button);

    // Create a modal for each station
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = `modal${index}`;

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    // Add the capital city label inside the modal (top-left corner)
    const modalCapitalLabel = document.createElement("div");
    modalCapitalLabel.className = "capital-modal"; // CSS class for styling
    modalCapitalLabel.innerText = station.capital;
    modalContent.appendChild(modalCapitalLabel);

    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";

    // Add the dynamic welcome message
    const modalText = document.createElement("p");
    modalText.innerText = `Welcome to ${station.capital}, the capital city of ${station.name}! Enjoy exploring the state's information including current population and weather.`;

    // Set the modal background color to match the state button color
    modalContent.style.backgroundColor = station.color;

    // Append elements to the modal content and modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);

    document.body.appendChild(modal); // Add modal to the document

    // Open modal on button click
    button.addEventListener("click", () => {
      modal.style.display = "block";
    });

    // Close modal when the "x" is clicked
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Throttled population update (every 10 seconds)
    setInterval(() => {
      const newPopulation = (station.initialPopulation +=
        (station.initialPopulation * station.growthRate) / 3153600); // Adjusted to update every 10 seconds

      populationLabel.innerText = `Population: ${Math.floor(
        newPopulation
      ).toLocaleString()}`;

      // Compare new population with last population
      if (newPopulation > lastPopulation) {
        greenLight.classList.add("active");
        redLight.classList.remove("active");
      } else if (newPopulation < lastPopulation) {
        redLight.classList.add("active");
        greenLight.classList.remove("active");
      }

      lastPopulation = newPopulation;
    }, 10000); // Throttled to update every 10 seconds

    // Update time every second
    updateTime(index, station.timeZone);
    setInterval(() => updateTime(index, station.timeZone), 1000);
  });

  // Event listener to close modals when clicking outside modal content
  window.onclick = function (event) {
    const openModals = document.querySelectorAll(".modal");
    openModals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  };
});
