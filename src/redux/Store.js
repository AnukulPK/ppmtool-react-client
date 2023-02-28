import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./features/todo/toDoSlice";
import projectReducer from "./features/project/projectSlice";
import backlogReducer from "./features/backlog/backlogSlice";

export const store = configureStore({
  reducer: {
    todos: toDoReducer,
    projects: projectReducer,
    backlogs: backlogReducer,
  },
});
