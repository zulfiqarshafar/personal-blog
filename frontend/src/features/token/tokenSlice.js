import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async action creator
export const refreshToken = createAsyncThunk("token/refreshToken", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_HOST}/api/users/refresh-token`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  return json;
});

// Reducer
export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: {
    [refreshToken.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.value = action.payload.accessToken;
      state.isLoading = false;
      state.hasError = false;
    },
    [refreshToken.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
