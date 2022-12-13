import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import usersReducer from "../slices/userSlice";
import tasksReducer from "../slices/taskSlice";
export const store = configureStore({
  // , task: tasksReducer
  reducer: { users: usersReducer, tasks: tasksReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
