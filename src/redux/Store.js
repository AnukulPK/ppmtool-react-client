import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./features/todo/toDoSlice";
import projectReducer from "./features/project/projectSlice";

export const store = configureStore({
  reducer: {
    todos: toDoReducer,
    projects: projectReducer,
  },
});
