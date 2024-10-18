# States and Capitals in the US

An interactive webpage featuring U.S. states with buttons that display live weather data, local time, population simulation, and a live radio player.

## Project Features

- **Luxon Library**: Used for handling time zones to display the local time in each state's capital city.
- **Weather Information**: Fetches the current weather from the OpenWeatherMap API for each state's capital.
- **Population Growth Simulation**: Population updates continuously based on the specified growth rate for each state.
- **Radio Stream Player**: Modal windows provide buttons to switch between streams (e.g., a main stream or a country music stream) for each state.

### Code Breakdown

#### HTML

- Contains a button container for each state, displaying information like the state name, capital, weather, and population. Modal windows are dynamically created for each state.

#### CSS

- Features a dark background, flexible button layout, and modal popups for the stream players.

#### JavaScript

- **Station Data**: Contains state-specific information, including the capital city, time zone, population, growth rate, and unique color.
- **Dynamic Button Creation**: Loops through the stations array to create and append buttons for each state.
- **Weather API Integration**: Calls the OpenWeatherMap API to fetch and display weather data.
- **Real-time Data Updates**: Uses `setInterval` to update population and local time every second.
- **Modals**: Opens a modal with audio stream options for each state.

## Plans for Future Development

- Add actual URLs for the radio streams.
- Continue improving the UI with JavaScript upgrades.

---

## Take a Look at the Project

[Click here](https://FHobbs8030.github.io/states_capitals_intheus/) to see the project in action.

---

## Watch the Presentation

[Click here](https://github.com/) to watch the presentation.

---

## Screenshots

### Example of the State Selection Interface

![Screenshot of state buttons](https://github.com/user-attachments/assets/99f250ec-a0e3-42b2-8b6a-05dcdcb90e69)

### Weather Data and Radio Stream Modal

![Screenshot of modal window](https://github.com/user-attachments/assets/4a5bba64-7556-426e-93e9-e97f236f0fc8)
