import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

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
    reducers: {
        fetchWeather: (state) => {
            state.loading = true;
            state.error = "";
            console.log("fetchWeather");
        },
        fetchWeatherSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            console.log("fetchWeatherSuccess");
        },
        fetchWeatherFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            console.log("fetchWeatherFailure");
        },
    }
});

export const { fetchWeather, fetchWeatherSuccess, fetchWeatherFailure } = weatherSlice.actions;
export const selectWeather = (state: RootState) => state.weather;
export default weatherSlice.reducer;

