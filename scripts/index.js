document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "a3e93ebcbeac87320f146f1fe859bf60"; // Replace this with your OpenWeatherMap API Key

  const stations = [
    {
      name: "Alabama",
      capital: "Montgomery",
      timeZone: "America/Chicago",
      color: "#FF5733",
      initialPopulation: 5024279,
      growthRate: 0.01,
    },
    {
      name: "Alaska",
      capital: "Juneau",
      timeZone: "America/Juneau",
      color: "#33FF57",
      initialPopulation: 733391,
      growthRate: 0.005,
    },
    {
      name: "Arizona",
      capital: "Phoenix",
      timeZone: "America/Phoenix",
      color: "#3357FF",
      initialPopulation: 7151502,
      growthRate: 0.02,
    },
    {
      name: "Arkansas",
      capital: "Little Rock",
      timeZone: "America/Chicago",
      color: "#FF33A6",
      initialPopulation: 3011524,
      growthRate: 0.008,
    },
    {
      name: "California",
      capital: "Sacramento",
      timeZone: "America/Los_Angeles",
      color: "#FF8C33",
      initialPopulation: 39538223,
      growthRate: 0.01,
    },
    {
      name: "Colorado",
      capital: "Denver",
      timeZone: "America/Denver",
      color: "#33FFF5",
      initialPopulation: 5773714,
      growthRate: 0.015,
    },
    {
      name: "Connecticut",
      capital: "Hartford",
      timeZone: "America/New_York",
      color: "#8C33FF",
      initialPopulation: 3605944,
      growthRate: 0.003,
    },
    {
      name: "Delaware",
      capital: "Dover",
      timeZone: "America/New_York",
      color: "#FF3333",
      initialPopulation: 989948,
      growthRate: 0.007,
    },
    {
      name: "Florida",
      capital: "Tallahassee",
      timeZone: "America/New_York",
      color: "#33FF8C",
      initialPopulation: 21538187,
      growthRate: 0.015,
    },
    {
      name: "Georgia",
      capital: "Atlanta",
      timeZone: "America/New_York",
      color: "#FF5733",
      initialPopulation: 10711908,
      growthRate: 0.013,
    },
    {
      name: "Hawaii",
      capital: "Honolulu",
      timeZone: "Pacific/Honolulu",
      color: "#33A6FF",
      initialPopulation: 1455271,
      growthRate: 0.004,
    },
    {
      name: "Idaho",
      capital: "Boise",
      timeZone: "America/Boise",
      color: "#A633FF",
      initialPopulation: 1839106,
      growthRate: 0.02,
    },
    {
      name: "Illinois",
      capital: "Springfield",
      timeZone: "America/Chicago",
      color: "#FF33F5",
      initialPopulation: 12812508,
      growthRate: 0.001,
    },
    {
      name: "Indiana",
      capital: "Indianapolis",
      timeZone: "America/Indiana/Indianapolis",
      color: "#33FF33",
      initialPopulation: 6785528,
      growthRate: 0.007,
    },
    {
      name: "Iowa",
      capital: "Des Moines",
      timeZone: "America/Chicago",
      color: "#FF8C33",
      initialPopulation: 3190369,
      growthRate: 0.005,
    },
    {
      name: "Kansas",
      capital: "Topeka",
      timeZone: "America/Chicago",
      color: "#33FF57",
      initialPopulation: 2937880,
      growthRate: 0.004,
    },
    {
      name: "Kentucky",
      capital: "Frankfort",
      timeZone: "America/New_York",
      color: "#5733FF",
      initialPopulation: 4505836,
      growthRate: 0.006,
    },
    {
      name: "Louisiana",
      capital: "Baton Rouge",
      timeZone: "America/Chicago",
      color: "#FF33A6",
      initialPopulation: 4657757,
      growthRate: 0.004,
    },
    {
      name: "Maine",
      capital: "Augusta",
      timeZone: "America/New_York",
      color: "#33A6FF",
      initialPopulation: 1362359,
      growthRate: 0.002,
    },
    {
      name: "Maryland",
      capital: "Annapolis",
      timeZone: "America/New_York",
      color: "#FF5733",
      initialPopulation: 6177224,
      growthRate: 0.008,
    },
    {
      name: "Massachusetts",
      capital: "Boston",
      timeZone: "America/New_York",
      color: "#FF5733",
      initialPopulation: 7029917,
      growthRate: 0.007,
    },
    {
      name: "Michigan",
      capital: "Lansing",
      timeZone: "America/Detroit",
      color: "#33FF57",
      initialPopulation: 10077331,
      growthRate: 0.003,
    },
    {
      name: "Minnesota",
      capital: "Saint Paul",
      timeZone: "America/Chicago",
      color: "#3357FF",
      initialPopulation: 5706494,
      growthRate: 0.008,
    },
    {
      name: "Mississippi",
      capital: "Jackson",
      timeZone: "America/Chicago",
      color: "#FF33A6",
      initialPopulation: 2961279,
      growthRate: 0.003,
    },
    {
      name: "Missouri",
      capital: "Jefferson City",
      timeZone: "America/Chicago",
      color: "#FF8C33",
      initialPopulation: 6154913,
      growthRate: 0.006,
    },
    {
      name: "Montana",
      capital: "Helena",
      timeZone: "America/Denver",
      color: "#33FFF5",
      initialPopulation: 1084225,
      growthRate: 0.01,
    },
    {
      name: "Nebraska",
      capital: "Lincoln",
      timeZone: "America/Chicago",
      color: "#8C33FF",
      initialPopulation: 1961504,
      growthRate: 0.008,
    },
    {
      name: "Nevada",
      capital: "Carson City",
      timeZone: "America/Los_Angeles",
      color: "#FF3333",
      initialPopulation: 3104614,
      growthRate: 0.018,
    },
    {
      name: "New Hampshire",
      capital: "Concord",
      timeZone: "America/New_York",
      color: "#33FF8C",
      initialPopulation: 1377529,
      growthRate: 0.005,
    },
    {
      name: "New Jersey",
      capital: "Trenton",
      timeZone: "America/New_York",
      color: "#FF5733",
      initialPopulation: 9288994,
      growthRate: 0.004,
    },
    {
      name: "New Mexico",
      capital: "Santa Fe",
      timeZone: "America/Denver",
      color: "#FF5733",
      initialPopulation: 2117522,
      growthRate: 0.006,
    },
    {
      name: "New York",
      capital: "Albany",
      timeZone: "America/New_York",
      color: "#33FF57",
      initialPopulation: 20201249,
      growthRate: 0.003,
    },
    {
      name: "North Carolina",
      capital: "Raleigh",
      timeZone: "America/New_York",
      color: "#3357FF",
      initialPopulation: 10439388,
      growthRate: 0.013,
    },
    {
      name: "North Dakota",
      capital: "Bismarck",
      timeZone: "America/Chicago",
      color: "#FF33A6",
      initialPopulation: 779094,
      growthRate: 0.01,
    },
    {
      name: "Ohio",
      capital: "Columbus",
      timeZone: "America/New_York",
      color: "#FF8C33",
      initialPopulation: 11799448,
      growthRate: 0.004,
    },
    {
      name: "Oklahoma",
      capital: "Oklahoma City",
      timeZone: "America/Chicago",
      color: "#33FFF5",
      initialPopulation: 3959353,
      growthRate: 0.009,
    },
    {
      name: "Oregon",
      capital: "Salem",
      timeZone: "America/Los_Angeles",
      color: "#8C33FF",
      initialPopulation: 4237256,
      growthRate: 0.012,
    },
    {
      name: "Pennsylvania",
      capital: "Harrisburg",
      timeZone: "America/New_York",
      color: "#FF3333",
      initialPopulation: 13002700,
      growthRate: 0.003,
    },
    {
      name: "Rhode Island",
      capital: "Providence",
      timeZone: "America/New_York",
      color: "#33FF8C",
      initialPopulation: 1097379,
      growthRate: 0.002,
    },
    {
      name: "South Carolina",
      capital: "Columbia",
      timeZone: "America/New_York",
      color: "#FF5733",
      initialPopulation: 5118425,
      growthRate: 0.012,
    },
    {
      name: "South Dakota",
      capital: "Pierre",
      timeZone: "America/Chicago",
      color: "#FF5733",
      initialPopulation: 886667,
      growthRate: 0.01,
    },
    {
      name: "Tennessee",
      capital: "Nashville",
      timeZone: "America/Chicago",
      color: "#33FF57",
      initialPopulation: 6916897,
      growthRate: 0.013,
    },
    {
      name: "Texas",
      capital: "Austin",
      timeZone: "America/Chicago",
      color: "#3357FF",
      initialPopulation: 29145505,
      growthRate: 0.02,
    },
    {
      name: "Utah",
      capital: "Salt Lake City",
      timeZone: "America/Denver",
      color: "#FF33A6",
      initialPopulation: 3271616,
      growthRate: 0.02,
    },
    {
      name: "Vermont",
      capital: "Montpelier",
      timeZone: "America/New_York",
      color: "#FF8C33",
      initialPopulation: 643077,
      growthRate: 0.002,
    },
    {
      name: "Virginia",
      capital: "Richmond",
      timeZone: "America/New_York",
      color: "#33FFF5",
      initialPopulation: 8631393,
      growthRate: 0.01,
    },
    {
      name: "Washington",
      capital: "Olympia",
      timeZone: "America/Los_Angeles",
      color: "#8C33FF",
      initialPopulation: 7693612,
      growthRate: 0.015,
    },
    {
      name: "West Virginia",
      capital: "Charleston",
      timeZone: "America/New_York",
      color: "#FF3333",
      initialPopulation: 1793716,
      growthRate: 0.002,
    },
    {
      name: "Wisconsin",
      capital: "Madison",
      timeZone: "America/Chicago",
      color: "#33FF8C",
      initialPopulation: 5893718,
      growthRate: 0.005,
    },
    {
      name: "Wyoming",
      capital: "Cheyenne",
      timeZone: "America/Denver",
      color: "#FF5733",
      initialPopulation: 576851,
      growthRate: 0.006,
    },
  ];

  const buttonContainer = document.getElementById("buttonContainer");

  // Function to update the time based on the time zone
  function updateTime(index, timeZone) {
    const now = luxon.DateTime.now().setZone(timeZone || "UTC");
    const dateTimeLabel = document.getElementById(`dateTime${index}`);
    dateTimeLabel.innerHTML = `${now.toFormat(
      "EEE, MMM dd, yyyy"
    )}<br>${now.toFormat("hh:mm:ss a")} (${now.offsetNameShort})`;
  }

  // Function to fetch weather data from OpenWeatherMap API
  async function fetchWeather(city, index) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
      );
      const data = await response.json();

      // Get weather info
      const temp = data.main.temp.toFixed(1);
      const description = data.weather[0].description;

      // Update weather info in the button
      const weatherInfo = document.getElementById(`weather${index}`);
      weatherInfo.innerHTML = `Temp: ${temp}°F<br>${description}`;
    } catch (error) {
      console.error(`Failed to fetch weather data for ${city}:`, error);
    }
  }

  // Loop over each station to create buttons and modals dynamically
  stations.forEach((station, index) => {
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

    // Add population display
    const populationLabel = document.createElement("div");
    populationLabel.className = "population";
    populationLabel.innerText = `Population: ${station.initialPopulation.toLocaleString()}`;
    button.appendChild(populationLabel);

    // Add weather display in the upper-right corner
    const weatherInfo = document.createElement("div");
    weatherInfo.className = "weather-info";
    weatherInfo.id = `weather${index}`;
    weatherInfo.innerText = "Loading...";
    button.appendChild(weatherInfo);

    // Append the button to the container
    buttonContainer.appendChild(button);

    // Fetch and display weather data for each city
    fetchWeather(station.capital, index);

    // Create modal for each station
    const modal = document.createElement("div");
    modal.id = `modal${index}`;
    modal.className = "modal";
    modal.innerHTML = `
            <div class="modal-content">
              <span class="close" data-index="${index}">&times;</span>
              <h2>${station.name} - More Info</h2>
              <p>Population: ${station.initialPopulation.toLocaleString()}</p>
              <div class="stream-buttons">
                <button id="mainStreamBtn${index}" class="active" data-index="${index}">Main Stream</button>
                <button id="countryStreamBtn${index}" data-index="${index}">Country Music Stream</button>
              </div>
              <audio id="audioPlayer${index}" controls>
                <source src="${station.url}" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
            </div>
          `;
    document.body.appendChild(modal);

    // Event listener to open modal on button click
    button.addEventListener("click", () => {
      document.getElementById(`modal${index}`).style.display = "block";
    });

    // Event listener to close modal
    document
      .querySelector(`.close[data-index="${index}"]`)
      .addEventListener("click", () => {
        document.getElementById(`modal${index}`).style.display = "none";
      });

    // Update population every second (simulate real-time growth)
    setInterval(() => {
      station.initialPopulation +=
        (station.initialPopulation * station.growthRate) / 31536000; // Growth per second
      populationLabel.innerText = `Population: ${Math.floor(
        station.initialPopulation
      ).toLocaleString()}`;
    }, 1000);

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