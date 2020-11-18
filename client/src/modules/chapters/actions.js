import { createAction } from 'redux-actions';

export const fetchChaptersRequest = createAction('FETCH_CHAPTERS_REQUEST');
export const fetchChaptersSuccess = createAction('FETCH_CHAPTERS_SUCCESS');
export const fetchChaptersFailure = createAction('FETCH_CHAPTERS_FAILURE');

export const fetchChapterRequest = createAction('FETCH_CHAPTER_REQUEST');
export const fetchChapterSuccess = createAction('FETCH_CHAPTER_SUCCESS');
export const fetchChapterFailure = createAction('FETCH_CHAPTER_FAILURE');

export const fetchAddChapterRequest = createAction('FETCH_ADD_CHAPTER_REQUEST');
export const fetchAddChapterSuccess = createAction('FETCH_ADD_CHAPTER_SUCCESS');
export const fetchAddChapterFailure = createAction('FETCH_ADD_CHAPTER_FAILURE');

export const fetchChapterNavRequest = createAction('FETCH_CHAPTER_NAV_REQUEST');
export const fetchChapterNavSuccess = createAction('FETCH_CHAPTER_NAV_SUCCESS');
export const fetchChapterNavFailure = createAction('FETCH_CHAPTER_NAV_FAILURE');

export const editFetchChapterRequest = createAction('FETCH_EDIT_CHAPTER_REQUEST');
export const editFetchChapterSuccess = createAction('FETCH_EDIT_CHAPTER_SUCCESS');
export const editFetchChapterFailure = createAction('FETCH_EDIT_CHAPTER_FAILURE');

export const changeFetchChapterRequest = createAction('FETCH_CHANGE_CHAPTER_REQUEST');
export const changeFetchChapterSuccess = createAction('FETCH_CHANGE_CHAPTER_SUCCESS');
export const changeFetchChapterFailure = createAction('FETCH_CHANGE_CHAPTER_FAILURE');

export const deleteFetchChapterRequest = createAction('FETCH_DELETE_CHAPTER_REQUEST');
export const deleteFetchChapterSuccess = createAction('FETCH_DELETE_CHAPTER_SUCCESS');
export const deleteFetchChapterFailure = createAction('FETCH_DELETE_CHAPTER_FAILURE');

export const sortFetchChapterRequest = createAction('FETCH_SORT_CHAPTER_REQUEST');
export const sortFetchChapterSuccess = createAction('FETCH_SORT_CHAPTER_SUCCESS');
export const sortFetchChapterFailure = createAction('FETCH_SORT_CHAPTER_FAILURE');

export const fetchLikeChapterRequest = createAction('FETCH_LIKE_CHAPTER_REQUEST');
export const fetchLikeChapterSuccess = createAction('FETCH_LIKE_CHAPTER_SUCCESS');
export const fetchLikeChapterFailure = createAction('FETCH_LIKE_CHAPTER_FAILURE');

export const deleteChapterOrder = createAction('DELETE_CHAPTER_ORDER');
export const sortChapterOrder = createAction('SORT_CHAPTER_ORDER');
export const addLinkChapter = createAction('ADD_LINK_CHAPTER');