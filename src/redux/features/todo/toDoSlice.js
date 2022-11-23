import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: "123",
        text: action.payload,
      };

      return [...state, todo];
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
