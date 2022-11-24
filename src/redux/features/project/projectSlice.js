import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: {},
};

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project, thunkAPI) => {
    try {
      return await projectService.createProject(project);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects = [...state.projects, action.payload];
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = {};
      })
      .addCase(createProject.rejected, (state, action) => {
        state.projects = [];
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
