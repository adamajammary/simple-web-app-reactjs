import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import tasksReducer from 'src/state/tasksReducer';

const store = configureStore({
  reducer: tasksReducer,
  middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch;
export type RootState   = ReturnType<typeof store.getState>;

export default store;
