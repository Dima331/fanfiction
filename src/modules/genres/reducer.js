import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchGenresFailure,
  } from './actions';

const elements = handleActions(
  {
    [fetchGenresRequest]: () => [],
    [fetchGenresSuccess]: (_state, action) => action.payload,
  },
  [],
);

const loading = handleActions(
  {
    [fetchGenresRequest]: () => true,
    [fetchGenresSuccess]: () => false,
    [fetchGenresFailure]: () => false,
  },
  false,
);

const error = handleActions(
  {
    [fetchGenresRequest]: () => null,
    [fetchGenresFailure]: (_state, action) => action.payload,
  },
  null,
);

export default combineReducers({
  elements,
  loading,
  error,
});