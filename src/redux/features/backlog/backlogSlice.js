import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import backlogService from "./backlogService";

const initialState = {
  project_tasks: [],
  project_task: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: {},
};

export const addProjectTask = createAsyncThunk(
  "backlogs/addProjectTask",
  async (backlog_id, project_task, thunkAPI) => {
    try {
      return await backlogService.addProjectTask(backlog_id, project_task);
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBacklog = createAsyncThunk(
  "backlogs/getBacklog",
  async () => {}
);

export const getProjectTask = createAsyncThunk(
  "backlogs/getProjectTask",
  async () => {}
);

export const deleteProjectTask = createAsyncThunk(
  "backlogs/deleteProjectTask",
  async () => {}
);

export const backlogSlice = createSlice({
  name: "backlogs",
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
      .addCase(addProjectTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProjectTask.fulfilled, (state, action) => {
        state.project_tasks = [...state.project_tasks, action.payload];
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(addProjectTask.rejected, (state, action) => {
        state.project_tasks = [];
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getBacklog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBacklog.fulfilled, (state, action) => {
        state.project_tasks = [...state.project_tasks, action.payload];
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getBacklog.rejected, (state, action) => {
        state.project_tasks = [];
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getProjectTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectTask.fulfilled, (state, action) => {
        state.project_task = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getProjectTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteProjectTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProjectTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.project_tasks = state.project_tasks.filter(
          (projectTask) => projectTask.projectIdentifier !== action.payload
        );
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deleteProjectTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = backlogSlice.actions;

export default backlogSlice.reducer;
