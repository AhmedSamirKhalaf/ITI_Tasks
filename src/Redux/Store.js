import {createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import combineReducers from './Reducers/combineReducers';

const myStore = createStore(combineReducers , composeWithDevTools());

export default myStore;