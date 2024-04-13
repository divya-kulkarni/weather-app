import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchWeatherByCity } from "./features/weather/weatherSlice";

function App() {
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = e.currentTarget.querySelector("input")?.value;
    if (city) {
      console.log("Fetching for ", city);
      dispatch(fetchWeatherByCity(city));
    }
  };
  const weatherData = useAppSelector((state) => state.weather.data);
  return (
    <>
      <div>
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter city name" />
          <button type="submit">Get Weather</button>
        </form>
        {weatherData ? (
          <div>
            <h2>{weatherData.city}</h2>
            <h2>{weatherData.temperature}</h2>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
