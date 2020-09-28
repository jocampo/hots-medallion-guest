import { createStore } from 'redux';
import { roomStateReducer } from './reducer';

const store = createStore(roomStateReducer);

export default store;
