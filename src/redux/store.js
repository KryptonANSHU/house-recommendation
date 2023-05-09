import { configureStore } from '@reduxjs/toolkit';
import gridReducer from './gridSlice.js';

const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
});

export default store;
