import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "config";
// Models
import IReservation from "models/Reservation";
// Services
import HttpService from "services/HttpService";

const url = `${config.apiURL}/reservations`;

// fetch current user reservations
export const fetchReservation = createAsyncThunk('reservations/Fetch current user reservation', async (params: any, thunkApi) => {
  try {
    const { data } = await HttpService.get(url, params);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
})
// create reservation
export const createReservation = createAsyncThunk('reservations/Create reservation', async (reservation: IReservation, thunkApi) => {
  try {
    const { data } = await HttpService.post(url, reservation);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
});
