import { createAction } from 'redux-actions';

export const fetchTagsRequest = createAction('FETCH_TAGS_REQUEST');
export const fetchTagsSuccess = createAction('FETCH_TAGS_SUCCESS');
export const fetchTagsFailure = createAction('FETCH_TAGS_FAILURE');
