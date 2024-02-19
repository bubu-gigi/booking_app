import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthProps {
  user: object,
  loading: boolean,
  error: string | undefined,
  isLogged: boolean,
}

const initialState: AuthProps = {
  user: {},
  loading: false,
  error: '',
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLogged: (state) => {
      state.isLogged = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerAsync.pending, (state) => {
      state.loading = true;
      state.user = {};
      state.error = '';
      state.isLogged = false;
      console.log("pending");
    }).addCase(registerAsync.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
      alert(state.error);
      state.isLogged = false;
    }).addCase(registerAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.user = action.payload;
      state.isLogged = false;
      console.log('completed');
    })

    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = '';
      state.user = {};
      state.isLogged = false;
    }).addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.error = action.error.message;
      state.isLogged = false;
      alert(state.error);
    }).addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.user = action.payload?.data;
      state.isLogged = true;
      console.log('completed');
    })
  }
});

export const registerAsync = createAsyncThunk(
  "auth/register",
  async(userData: object) => {
    const response = await axios.post('/register', userData, {withCredentials: true});
    console.log(response);
    return response;
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async(userData: object) => {
    try {
      const response = await axios.post('/login', userData, {withCredentials: true});
      return response;
    } catch (e) {
      console.log(e);
    }
  }
)


export const { setIsLogged } = authSlice.actions;

export default authSlice.reducer;
