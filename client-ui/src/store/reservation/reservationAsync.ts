import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../config";
// Models
import IReservation from "../../models/Reservation";
// Services
import HttpService from "../../services/HttpService";

const url = `${config.apiURL}/reservations`;

// fetch reservations
export const fetchReservation = createAsyncThunk('reservations/Fetch reservation', async (params: any, thunkApi) => {
  try {
    const { data } = await HttpService.get(url, params);
    return data;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
})
// delete reservation
export const deleteReservation = createAsyncThunk('reservations/Delete reservation', async (id: string, thunkApi) => {
  try {
    await HttpService.delete(`${url}/${id}`);
    return id;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data);
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
// update reservation
export const updateReservation = createAsyncThunk('reservations/Update reservation', async (data: any, thunkApi) => {
  try {
    const { reservationId, reservationData } = data;
    const { data:reservation } = await HttpService.put(`${url}/${reservationId}`, reservationData);
    return reservation;
  } catch (e: any) {
    return thunkApi.rejectWithValue(e.response.data)
  }
})