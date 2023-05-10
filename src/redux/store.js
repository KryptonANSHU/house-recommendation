import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import gridReducer from './gridSlice';
import cordinateReducer from './cordinateSlice';

const rootReducer = combineReducers({
  grid: gridReducer,
  coordinates: cordinateReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;