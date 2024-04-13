import "./App.css";
import { useAppDispatch } from "./app/hooks";

function App() {
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const city = e.currentTarget.querySelector("input")?.value;
    if (city) {
      console.log(city);
    }
    dispatch({ type: "weather/fetchWeather" });
  };
  return (
    <>
      <div>
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter city name" />
          <button type="submit">Get Weather</button>
        </form>
      </div>
    </>
  );
}

export default App;
