import { createAction } from 'redux-actions';

export const fetchGenresRequest = createAction('FETCH_GENRES_REQUEST');
export const fetchGenresSuccess = createAction('FETCH_GENRES_SUCCESS');
export const fetchGenresFailure = createAction('FETCH_GENRES_FAILURE');
