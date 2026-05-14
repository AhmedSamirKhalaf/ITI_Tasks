import { configureStore } from '@reduxjs/toolkit';
import combineReducers from './Reducers/combineReducers';

const myStore = configureStore({
    reducer: combineReducers,
});

export default myStore;