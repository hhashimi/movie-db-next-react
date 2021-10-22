import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let defaultState = {
  loggedIn: false,
  name: "",
  email: "",
  token: "",
  favoriteMovies: [],
};

const initialState = { ...defaultState };

export const getUserByToken = createAsyncThunk(
  "user/getProfile",
  async (arg, { getState, rejectWithValue }) => {
    let state = getState().user;
    let jwtToken = localStorage.getItem("jwt_token");

    if (jwtToken) {
      if (!state.loggedIn) {
        const getProfile = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/users/profile`,
          {
            headers: {
              Authorization: "Bearer " + jwtToken,
            },
          }
        );
        let response = await getProfile.json();
        return response;
      }
    } else {
      return rejectWithValue("JWT Token is missing");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addMovieToFavorite: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    removeMovieFromFavorite: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie != action.payload
      );
    },
    logout: (state) => {
      // delete jwt token
      localStorage.removeItem("jwt_token");
    },
  },
  extraReducers: {
    [getUserByToken.fulfilled]: (state, { payload }) => {
      if (payload) {
        state.name = payload.name;
        state.email = payload.email;
        state.favoriteMovies = payload.movies;
        state.loggedIn = true;
        state.token = localStorage.getItem("jwt_token");
      }
    },
    [getUserByToken.rejected]: (state) => {
      state.loggedIn = false;
      state.name = "";
      state.email = "";
      state.token = "";
      state.favoriteMovies = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, addMovieToFavorite, removeMovieFromFavorite } =
  userSlice.actions;

export default userSlice.reducer;
