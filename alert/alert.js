// alert.js
export function setupLights(stationButton, index) {
  // Create container elements for red and green lights
  const redLightsContainer = document.createElement("div");
  redLightsContainer.className = "red-lights-container";
  stationButton.appendChild(redLightsContainer);

  const greenLightsContainer = document.createElement("div");
  greenLightsContainer.className = "green-lights-container";
  stationButton.appendChild(greenLightsContainer);

  // Create 5 red lights for the left side
  for (let i = 0; i < 5; i++) {
    const redLight = document.createElement("div");
    redLight.className = "light red";
    redLight.id = `redLight${index}-${i}`;
    redLightsContainer.appendChild(redLight);
  }

  // Create 5 green lights for the right side
  for (let i = 0; i < 5; i++) {
    const greenLight = document.createElement("div");
    greenLight.className = "light green";
    greenLight.id = `greenLight${index}-${i}`;
    greenLightsContainer.appendChild(greenLight);
  }
}

export function updateAlertLights(station, index) {
  const alerts = [
    station.floodAlert,
    station.earthquakeAlert,
    station.stormAlert,
    station.fireAlert,
    station.damPressureAlert,
  ];

  alerts.forEach((alert, alertIndex) => {
    const redLight = document.getElementById(`redLight${index}-${alertIndex}`);
    const greenLight = document.getElementById(
      `greenLight${index}-${alertIndex}`
    );

    if (alert) {
      // Turn on red light and turn off the corresponding green light
      if (redLight) redLight.classList.add("active");
      if (greenLight) greenLight.classList.remove("active");
    } else {
      // Turn on green light and turn off the corresponding red light
      if (redLight) redLight.classList.remove("active");
      if (greenLight) greenLight.classList.add("active");
    }
  });
}

// Mock function for updating alerts (for testing purposes)
export function mockUpdateAlerts(station) {
  station.floodAlert = Math.random() < 0.1;
  station.earthquakeAlert = Math.random() < 0.05;
  station.stormAlert = Math.random() < 0.05;
  station.fireAlert = Math.random() < 0.03;
  station.damPressureAlert = Math.random() < 0.02;
}
