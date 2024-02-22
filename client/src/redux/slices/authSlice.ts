import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthProps {
  user: object | null,
  loading: boolean,
  error: string | undefined | null,
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
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(registerAsync.pending, (state) => {
      state.loading = true;
      state.user = null;
      state.error = null;
      state.isLogged = false;
    }).addCase(registerAsync.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
      state.isLogged = false;
    }).addCase(registerAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isLogged = false;
    }),

    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.isLogged = false;
    }).addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
      state.isLogged = false;
      alert(state.error);
    }).addCase(loginAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = null;
      state.user = action.payload?.data;
      state.isLogged = true;
    }),

    builder.addCase(profileAsync.pending, (state) => {
      state.loading = true;
      state.error =  null;
      state.user = null;
      state.isLogged = false;
    }).addCase(profileAsync.rejected, (state,action) => {
      state.loading = false;
      state.error = action.error.message;
      state.user = null;
      state.isLogged = false;
    }).addCase(profileAsync.fulfilled, (state,action) => {
      if(action.payload == null) {
        state.user = null;
        state.isLogged = false;
      } else {
        state.user = action.payload;
        state.isLogged = true;
      }
      state.loading = false;
      state.error = null;
    }),

    builder.addCase(logoutAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    }).addCase(logoutAsync.rejected, (state,action) => {
      state.loading = false;
      state.error = action.error.message;
    }).addCase(logoutAsync.fulfilled, (state,action) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isLogged = false;
    })
  }
});

export const registerAsync = createAsyncThunk(
  "auth/register",
  async(userData: object) => {
    console.log(userData);
    const {data} = await axios.post('/register', userData, {withCredentials: true});
    console.log(data)
    return data;
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async(userData: object) => {
    try {
      const data = await axios.post('/login', userData, {withCredentials: true});
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const profileAsync = createAsyncThunk(
  "auth/profile",
  async() => {
    try {
      const {data} = await axios.get('/profile', {withCredentials: true});
      return data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async() => {
    try {
      const response = await axios.get('/logout', {withCredentials: true});
      return response;
    } catch (e) {
      console.error(e);
    }
  }
)

export default authSlice.reducer;
