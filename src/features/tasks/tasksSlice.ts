import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Task[];
}

interface TasksState {
  maxTaskId: number | null;
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  maxTaskId: null,
};

const API_URL = "http://46.100.46.149:8069/api/tasks";

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get<ApiResponse>(API_URL);
  return response.data.results;
});

export const fetchMaxTaskId = createAsyncThunk(
  "tasks/fetchMaxTaskId",
  async () => {
    const response = await axios.get<ApiResponse>(API_URL);
    const maxId = Math.max(...response.data.results.map((task) => task.id), 0);
    return maxId + 1;
  }
);

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (task: Omit<Task, "id"> & { id: number }) => {
      const response = await axios.post<Task>(API_URL, task);
      return { ...task, id: response.data.id };
    }
  );
  
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, task }: { id: number; task: Omit<Task, "id"> }) => {
    const response = await axios.put<Task>(`${API_URL}/${id}`, task);
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
      })
      .addCase(
        fetchMaxTaskId.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.maxTaskId = action.payload;
        }
      )
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
