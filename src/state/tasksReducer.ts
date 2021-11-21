import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppLabel } from 'src/const/app-label';
import { Task } from 'src/models/Task';

export interface TasksState {
  tasks: Task[]
}

const initialState: TasksState = {
  tasks: []
}

export const tasksReducer = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    initTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    createTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((v, i, o) => v._id === action.payload);

      if (index > -1) {
        state.tasks.splice(index, 1);
      }
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((v, i, o) => v._id === action.payload._id);

      if (index > -1) {
        state.tasks[index] = action.payload;
      }
    },
    sortTasks: (state, action: PayloadAction<string>) => {
      state.tasks = getSortedTasks(state, action.payload);
    }
  }
});

function getSortedTasks(state: TasksState, sort: string): Task[] {
  if (sort.endsWith('_desc')) {
    sort = sort.substr(0, sort.length - 5);

    return state.tasks.slice().sort((a: any, b: any) => (a[sort].toLowerCase() > b[sort].toLowerCase() ? -1 : (a[sort].toLowerCase() < b[sort].toLowerCase() ? 1 : 0)));
  } else {
    return state.tasks.slice().sort((a: any, b: any) => (a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : (a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : 0)));
  }
}

export function getTask(state: TasksState): Task {
  const id    = new URLSearchParams(window.location.search).get('id');
  const index = state.tasks.findIndex((v, i, o) => v._id === id);

  return (index > -1 ? state.tasks[index] : { title: '', description: '', date: '', status: '' });
}

export function getTasks(state: TasksState): Task[] {
  const sort = new URLSearchParams(window.location.search).get('sort');

  return getSortedTasks(state, sort ? sort : AppLabel.API.Rules[0].Field);
}

export const { createTask, deleteTask, editTask, initTasks, sortTasks } = tasksReducer.actions;

export default tasksReducer.reducer;
