import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Weather {
  city: string;
  temperature: number;
}

interface WeatherState {
  data: Weather | null;
  loading: boolean;
  error: string;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});
// const dispatch = useAppDispatch();

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city: string) => {
    console.log("fetchWeatherByCity");
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?q=${city}&key=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log("Response->", response);
    console.log({
      city: data.location.name,
      temperature: data.current.temp_c,
    });

    return {
      city: data.location.name,
      temperature: data.current.temp_c,
    };
  }
);

export const selectWeather = (state: RootState) => state.weather;
export default weatherSlice.reducer;
