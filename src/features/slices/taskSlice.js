import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const createTask = createAsyncThunk(
  "task/createTask",
  async ({ name, desc, completed }, { rejectWithValue }) => {
    const res = axios
      .post(
        "https://todo-sv.onrender.com/api/task",
        {
          newTask: {
            name,
            desc,
            completed,
          },
        },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch((err) =>
        rejectWithValue("Hubo un error al querer crear la tarea: " + err)
      );
    return res;
  }
);

export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (obj, { rejectWithValue }) => {
    const res = axios
      .get("https://todo-sv.onrender.com/api/tasks", { withCredentials: true })
      .then((res) => res.data)
      .catch((err) =>
        rejectWithValue("No se ha logrado encontrar las tareas: " + err)
      );

    return res;
  }
);

export const sendDeletedTask = createAsyncThunk(
  "task/sendDeletedTask",
  async (id, { rejectWithValue }) => {
    const res = axios
      .post(
        `https://todo-sv.onrender.com/api/task/delete/${id}`,
        {
          taskId: id,
        },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch((err) =>
        rejectWithValue("No se ha logrado eliminar la tarea: " + err.message)
      );
    return res;
  }
);

export const sendEditedTask = createAsyncThunk(
  "task/sendEditedTask",
  async (obj, { rejectWithValue }) => {
    const res = axios
      .post(
        `https://todo-sv.onrender.com/api/task/${obj._id}`,
        { taskData: obj },
        { withCredentials: true }
      )
      .then((res) => res.data)
      .catch((err) =>
        rejectWithValue("No se ha podido editar la tarea: " + err)
      );
    return res;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: { listOfTasks: [] },
  reducers: {
    editTask: (state, { payload }) => {
      state.editedTask = payload;
    },
  },
  extraReducers: {
    [createTask.pending]: (state) => {
      state.createTaskStatus = "loading";
    },
    [createTask.fulfilled]: (state) => {
      state.createTaskStatus = "success";
      toast.success("Se ha creado su tarea con éxito", {
        position: "bottom-left",
      });
    },
    [createTask.rejected]: (state) => {
      state.createTaskStatus = "failed";
      toast.error("No se ha logrado crear la tarea", {
        position: "bottom-left",
      });
    },
    [getTasks.pending]: (state) => {
      state.getTaskStatus = "loading";
    },
    [getTasks.fulfilled]: (state, { payload }) => {
      state.listOfTasks = payload;
      state.getTaskStatus = "success";
    },
    [getTasks.rejected]: (state) => {
      state.getTaskStatus = "failed";
      state.listOfTasks = [];
    },
    [sendEditedTask.pending]: (state) => {
      state.sendEditedTaskStatus = "loading";
    },
    [sendEditedTask.fulfilled]: (state) => {
      state.sendEditedTaskStatus = "success";
    },
    [sendEditedTask.rejected]: (state) => {
      state.sendEditedTaskStatus = "failed";
    },
    [sendDeletedTask.pending]: (state) => {
      state.sendDeletedTaskStatus = "loading";
    },
    [sendDeletedTask.fulfilled]: (state) => {
      state.sendDeletedTaskStatus = "success";
    },
    [sendDeletedTask.rejected]: (state) => {
      state.sendDeletedTaskStatus = "failed";
    },
  },
});

export const { editTask } = taskSlice.actions;
export default taskSlice.reducer;
