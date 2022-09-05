import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "config";
import IReservation from "models/Reservation";

const url = `${config.apiURL}/reservations`;

// fetch reservations
export const fetchReservation = createAsyncThunk('reservations/Fetch reservation', async (params: any, thunkApi) => {
  try {
    const nextParams = new URLSearchParams();

    Object.keys(params).forEach((key: string) => {
      if (params[key]) {
        nextParams.append(key, params[key]);
      }
    })

    const { data } = await axios.get(`${url}?${nextParams}`);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
})
// delete reservation
export const deleteReservation = createAsyncThunk('reservations/Delete reservation', async (id: string, thunkApi) => {
  try {
    await axios.delete(`${url}/${id}`);
    return id;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
  }
})
// create reservation 
export const createReservation = createAsyncThunk('reservations/Create reservation', async (reservation: IReservation, thunkApi) => {
  try {
    const { data } = await axios.post(url, reservation);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
});
// update reservation
export const updateReservation = createAsyncThunk('reservations/Update reservation', async (params: any, thunkApi) => {
  try {
    const { data } = await axios.put(`${url}/${params.reservationId}`, params.reservation);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
})