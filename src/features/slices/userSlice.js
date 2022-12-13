import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (obj, { rejectWithValue }) => {
    return axios
      .get("https://todo-sv.onrender.com/api/user", {
        withCredentials: true,
      })
      .then((res) => res.data.user)
      .catch(() => rejectWithValue("No se ha encontrado el usuario"));
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (obj, { rejectWithValue }) => {
    return axios
      .post(
        "https://todo-sv.onrender.com/api/register",
        {
          name: obj.name,
          email: obj.email,
          password: obj.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data.user)
      .catch(() => rejectWithValue("No se ha encontrado el usuario"));
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (obj, { rejectWithValue }) => {
    const res = axios
      .post(
        "https://todo-sv.onrender.com/api/login",
        {
          email: obj.email,
          password: obj.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue("Ha ocurrido un error: " + err.message);
      });
    return res;
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (obj, { rejectWithValue }) => {
    const res = await axios
      .post("https://todo-sv.onrender.com/api/logout", null, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err) => {
        rejectWithValue("Ha ocurrido un error: " + err.message);
      });
    return res;
  }
);

const initialState = { name: "", email: "", _id: "", roles: [] };

const userSlice = createSlice({
  name: "user",
  initialState: { initialState, isLoggedIn: false },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoggedIn = false;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
    [getUser.rejected]: (state) => {
      state.user = { name: "", email: "", id: "", roles: [] };
      state.isLoggedIn = false;
    },
    [createUser.pending]: (state) => {
      state.createUserStatus = "loading";
    },
    [createUser.fulfilled]: (state) => {
      state.createUserStatus = "success";
      toast.success("¡Cuenta creada exitosamente!", {
        position: "bottom-left",
      });
    },
    [createUser.rejected]: (state) => {
      state.createUserStatus = "failed";
      toast.error(
        "No se ha logrado crear la cuenta, verifique el correo y/o contraseña",
        {
          position: "bottom-left",
        }
      );
    },
    [loginUser.pending]: (state) => {
      state.isLoggedIn = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.isLoggedIn = true;
      toast.success("Se ha iniciado sesión correctamente", {
        position: "bottom-left",
      });
    },
    [loginUser.rejected]: (state) => {
      state.isLoggedIn = false;
      toast.error(
        "No se ha podido iniciar sesión, verifique correo y/o contraseña",
        {
          position: "bottom-left",
        }
      );
    },
    [logoutUser.pending]: (state) => {
      state.logoutUser = "loading";
    },
    [logoutUser.fulfilled]: (state) => {
      state.user = initialState;
      state.logoutUser = "success";
      toast.success("Se ha cerrado sesión correctamente", {
        position: "bottom-left",
      });
    },
    [logoutUser.rejected]: (state) => {
      state.logoutUser = "failed";
    },
  },
});

export default userSlice.reducer;
