import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export default class TodosAsynk {
  private static _url: string = `${config.apiTodos}/todos?userId=88888`

  public static fetchTodos = createAsyncThunk('todos/fetchTodos', async (params:any, thunkApi) => {
    try {
      const response: any = await axios.get(this._url, params);
      return response.data;
    } catch {
      return thunkApi.rejectWithValue(null);
    }
  });
};
