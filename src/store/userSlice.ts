import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signin, signout, signup, updateUserInfo, UserInfo } from "../api/user";
import { userCache } from "../constants/cache";
import { RootState } from "./store";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: number;
}

export interface UserState {
  token: string;
  user: User;
}

const initialState = userCache;

export const register = createAsyncThunk(
  "user/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await signup(name, email, password);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await signin(email, password);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await signout();
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const update = createAsyncThunk<
  UserInfo,
  { name: string; email: string; password: string },
  {
    state: RootState;
  }
>(
  "user/update",
  async ({ name, email, password }, { rejectWithValue, getState }) => {
    try {
      const response = await updateUserInfo(
        getState().user?.user._id ?? "",
        name,
        email,
        password
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (_, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload));
      return payload;
    });

    builder.addCase(logout.fulfilled, () => {
      localStorage.removeItem("user");
      return null;
    });

    builder.addCase(update.fulfilled, (state, { payload }) => {
      state!.user = payload;
      localStorage.setItem("user", JSON.stringify(state));
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;

export default userSlice.reducer;
