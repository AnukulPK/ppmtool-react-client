import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectService from "./projectService";

const initialState = {
  projects: [],
  project: {},
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

export const getProjects = createAsyncThunk(
  "projects/getProjects",
  async (_, thunkAPI) => {
    try {
      return await projectService.getProjects();
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProject = createAsyncThunk(
  "projects/getProject",
  async (projectId, thunkAPI) => {
    try {
      return await projectService.getProject(projectId);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId, thunkAPI) => {
    try {
      return await projectService.deleteProject(projectId);
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
      })
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.projects = [];
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project = action.payload;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = state.projects.filter(
          (project) => project.projectIdentifier !== action.payload
        );
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = projectSlice.actions;

export default projectSlice.reducer;
