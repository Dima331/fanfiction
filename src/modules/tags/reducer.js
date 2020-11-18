import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
  } from './actions';

const elements = handleActions(
  {
    [fetchTagsRequest]: () => [],
    [fetchTagsSuccess]: (_state, action) => action.payload,
  },
  [],
);

const loading = handleActions(
  {
    [fetchTagsRequest]: () => true,
    [fetchTagsSuccess]: () => false,
    [fetchTagsFailure]: () => false,
  },
  false,
);

const error = handleActions(
  {
    [fetchTagsRequest]: () => null,
    [fetchTagsFailure]: (_state, action) => action.payload,
  },
  null,
);

export default combineReducers({
  elements,
  loading,
  error,
});