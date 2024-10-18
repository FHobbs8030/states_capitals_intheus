import { stations } from "./stations.js";
console.log(stations);

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "a3e93ebcbeac87320f146f1fe859bf60"; 
  const buttonContainer = document.getElementById("buttonContainer"); 

  console.log(stations); 

  function updateTime(index, timeZone) {
    const now = luxon.DateTime.now().setZone(timeZone || "UTC");
    const dateTimeLabel = document.getElementById(`dateTime${index}`);
    dateTimeLabel.innerHTML = `${now.toFormat(
      "EEE, MMM dd, yyyy"
    )}<br>${now.toFormat("hh:mm:ss a")} (${now.offsetNameShort})`;
  }

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

      if (
        description.includes("thunderstorm") ||
        description.includes("rain") ||
        description.includes("drizzle") ||
        description.includes("snow")
      ) {
        button.style.filter = "brightness(50%)"; 
      } else if (description.includes("clouds")) {
        button.style.filter = "brightness(75%)"; 
      } else if (temp < 32) {
        button.style.filter = "brightness(60%)"; 
      } else {
        button.style.filter = "brightness(100%)"; 
      }
    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error);
    }
  }

  stations.forEach((station, index) => {
    let lastPopulation = station.initialPopulation; 

    const button = document.createElement("button");
    button.className = "station-button";
    button.style.backgroundColor = station.color;

    const stateName = document.createElement("div");
    stateName.className = "station-name";
    stateName.innerText = station.name;
    button.appendChild(stateName);

    const capitalLabel = document.createElement("div");
    capitalLabel.className = "capital";
    capitalLabel.innerText = station.capital;
    button.appendChild(capitalLabel);

    const dateTimeLabel = document.createElement("div");
    dateTimeLabel.className = "date-time";
    dateTimeLabel.id = `dateTime${index}`;
    button.appendChild(dateTimeLabel);

    const lightContainer = document.createElement("div");
    lightContainer.className = "light-container";

    const redLight = document.createElement("div");
    redLight.className = "light red";
    lightContainer.appendChild(redLight);

    const populationLabel = document.createElement("div");
    populationLabel.className = "population";
    populationLabel.innerText = `Population: ${station.initialPopulation.toLocaleString()}`;
    lightContainer.appendChild(populationLabel);

    const hoverSound = new Audio("audio/A.mp3"); 
    const clickSound = new Audio("audio/B.mp3"); 

    hoverSound.volume = 0.1;
    clickSound.volume = 0.1;

    button.addEventListener("mouseenter", () => {
      hoverSound.currentTime = 0; 
      hoverSound.play().catch((error) => {
        console.log("Hover sound autoplay prevented:", error);
      });
    });

    button.addEventListener("mouseleave", () => {
      hoverSound.pause(); 
      hoverSound.currentTime = 0; 
    });

    button.addEventListener("click", () => {
      clickSound.currentTime = 0; 
      clickSound.play().catch((error) => {
        console.log("Click sound autoplay prevented:", error);
      });
    });

    button.appendChild(lightContainer);

    const greenLightWrapper = document.createElement("div");
    greenLightWrapper.className = "green-light-wrapper";

    const greenLight = document.createElement("div");
    greenLight.className = "light green";
    greenLightWrapper.appendChild(greenLight);

    button.appendChild(greenLightWrapper);

    const weatherInfo = document.createElement("div");
    weatherInfo.className = "weather-info";
    weatherInfo.id = `weather${index}`;
    weatherInfo.innerText = "Loading..."; 
    button.appendChild(weatherInfo);

    fetchWeather(station.capital, index, button);

    buttonContainer.appendChild(button);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = `modal${index}`;

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";

    const modalText = document.createElement("p");
    modalText.innerText = `Welcome to ${station.capital}, the capital city of ${station.name}! Enjoy exploring the state's information including current population and weather.`;

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);

    document.body.appendChild(modal); 

    button.addEventListener("click", () => {
      modal.style.display = "block";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    setInterval(() => {
      const newPopulation = (station.initialPopulation +=
        (station.initialPopulation * station.growthRate) / 3153600); // Adjusted to update every 10 seconds

      populationLabel.innerText = `Population: ${Math.floor(
        newPopulation
      ).toLocaleString()}`;

      if (newPopulation > lastPopulation) {
        greenLight.classList.add("active");
        redLight.classList.remove("active");
      } else if (newPopulation < lastPopulation) {
        redLight.classList.add("active");
        greenLight.classList.remove("active");
      }

      lastPopulation = newPopulation;
    }, 10000); 

    updateTime(index, station.timeZone);
    setInterval(() => updateTime(index, station.timeZone), 1000);
  });

  window.onclick = function (event) {
    const openModals = document.querySelectorAll(".modal");
    openModals.forEach((modal) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  };
});
