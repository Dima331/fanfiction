import { createAction } from 'redux-actions';

export const fetchFanfictionsRequest = createAction('FETCH_FANFICTIONS_REQUEST');
export const fetchFanfictionsSuccess = createAction('FETCH_FANFICTIONS_SUCCESS');
export const fetchFanfictionsFailure = createAction('FETCH_FANFICTIONS_FAILURE');

export const fetchFanfictionRequest = createAction('FETCH_FANFICTION_REQUEST');
export const fetchFanfictionSuccess = createAction('FETCH_FANFICTION_SUCCESS');
export const fetchFanfictionFailure = createAction('FETCH_FANFICTION_FAILURE');

export const fetchAddFanfictionRequest = createAction('FETCH_ADD_FANFICTION_REQUEST');
export const fetchAddFanfictionSuccess = createAction('FETCH_ADD_FANFICTION_SUCCESS');
export const fetchAddFanfictionFailure = createAction('FETCH_ADD_FANFICTION_FAILURE');

export const fetchEditFanfictionRequest = createAction('FETCH_EDIT_FANFICTION_REQUEST');
export const fetchEditFanfictionSuccess = createAction('FETCH_EDIT_FANFICTION_SUCCESS');
export const fetchEditFanfictionFailure = createAction('FETCH_EDIT_FANFICTION_FAILURE');

export const fetchChangeFanfictionRequest = createAction('FETCH_CHANGE_FANFICTION_REQUEST');
export const fetchChangeFanfictionSuccess = createAction('FETCH_CHANGE_FANFICTION_SUCCESS');
export const fetchChangeFanfictionFailure = createAction('FETCH_CHANGE_FANFICTION_FAILURE');

export const fetchDeleteFanfictionRequest = createAction('FETCH_DELETE_FANFICTION_REQUEST');
export const fetchDeleteFanfictionSuccess = createAction('FETCH_DELETE_FANFICTION_SUCCESS');
export const fetchDeleteFanfictionFailure = createAction('FETCH_DELETE_FANFICTION_FAILURE');

export const filterGenreFanfictions = createAction('FILTER_GENRE_FANFICTION');
export const filterTagFanfictions = createAction('FILTER_TAG_FANFICTION');
export const filterResetFanfictions = createAction('FILTER_RESET_FANFICTION');
export const filterTimeLaterFanfictions = createAction('FILTER_TIME_LATER_FANFICTION');
export const filterTimeEarlyFanfictions = createAction('FILTER_TIME_EARLY_FANFICTION');

export const fetchUserFanfictionsRequest = createAction('FETCH_USER_FANFICTION_REQUEST');
export const fetchUserFanfictionsSuccess = createAction('FETCH_USER_FANFICTION_SUCCESS');
export const fetchUserFanfictionsFailure = createAction('FETCH_USER_FANFICTION_FAILURE');

export const fetchCommentsFanfictionRequest = createAction('FETCH_COMMENTS_FANFICTION_REQUEST');
export const fetchCommentsFanfictionSuccess = createAction('FETCH_COMMENTS_FANFICTION_SUCCESS');
export const fetchCommentsFanfictionFailure = createAction('FETCH_COMMENTS_FANFICTION_FAILURE');
export const addCommentsFanfiction = createAction('ADD_COMMENTS_FANFICTION');


export const fetchRatingRequest = createAction('FETCH_RATING_REQUEST');
export const fetchRatingSuccess = createAction('FETCH_RATING_SUCCESS');
export const fetchRatingFailure = createAction('FETCH_RATING_FAILURE');
export const changeRating = createAction('CHANGE_RATING');

export const filterMainGenreFanfictions = createAction('FILTER_MAIN_GENRE_FANFICTION');
export const filterMainTagFanfictions = createAction('FILTER_MAIN_TAG_FANFICTION');
export const filterMainResetFanfictions = createAction('FILTER_MAIN_RESET_FANFICTION');
export const addLinkFanfiction = createAction('ADD_LINK_FANFICTION');
export const filterRatingMax = createAction('FILTER_RATING_MAX');
export const filterRatingMin = createAction('FILTER_RATING_MIN');
