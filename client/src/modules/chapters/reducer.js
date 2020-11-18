import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import {
  fetchChaptersRequest,
  fetchChaptersSuccess,
  fetchChaptersFailure,
} from './actions';

import {
  fetchChapterRequest,
  fetchChapterSuccess,
  fetchChapterFailure,
} from './actions';

import {
  fetchChapterNavRequest,
  fetchChapterNavSuccess,
  fetchChapterNavFailure,
  addLinkChapter
} from './actions';

import {
  editFetchChapterRequest,
  editFetchChapterSuccess,
  editFetchChapterFailure,
} from './actions';

import {
  changeFetchChapterRequest,
  changeFetchChapterSuccess,
  changeFetchChapterFailure,
} from './actions';

import {
  deleteFetchChapterRequest,
  deleteFetchChapterSuccess,
  deleteFetchChapterFailure,
  deleteChapterOrder
} from './actions';

import {
  sortFetchChapterRequest,
  sortFetchChapterSuccess,
  sortFetchChapterFailure,
  sortChapterOrder
} from './actions';

import {
  fetchLikeChapterRequest,
  fetchLikeChapterSuccess,
  fetchLikeChapterFailure,
} from './actions';


const chapters = handleActions({
  [fetchChaptersRequest]: () => [],
  [fetchChaptersSuccess]: (_state, action) => action.payload,
  [deleteChapterOrder]: (_state, action) => { 
    return action.payload.chapters},
  [sortChapterOrder]: (_state, action) => { 
      return action.payload},
    
}, []);

const chaptersLoading = handleActions({
  [fetchChaptersRequest]: () => true,
  [fetchChaptersSuccess]: () => false,
  [fetchChaptersFailure]: () => false,
}, false);

const chaptersError = handleActions({
  [fetchChaptersRequest]: () => null,
  [fetchChaptersFailure]: (_state, action) => action.payload,
}, null);

const chapter = handleActions({
  [fetchChapterRequest]: () => [],
  [fetchChapterSuccess]: (_state, action) => {console.log(action.payload)
  return action.payload},
  [fetchLikeChapterSuccess]: (_state, action) => {
    _state.overall_likes = action.payload.overall_likes

    return _state
  },
}, []);

const chapterLoading = handleActions({
  [fetchChapterRequest]: () => true,
  [fetchChapterSuccess]: () => false,
  [fetchChapterFailure]: () => false,
}, false);

const chapterError = handleActions({
  [fetchChapterRequest]: () => null,
  [fetchChapterFailure]: (_state, action) => action.payload,
}, null);

const chapterNav = handleActions({
  [fetchChapterNavRequest]: () => [],
  [fetchChapterNavSuccess]: (_state, action) => action.payload,
}, []);

const chapterNavLoading = handleActions({
  [fetchChapterNavRequest]: () => true,
  [fetchChapterNavSuccess]: () => false,
  [fetchChapterNavFailure]: () => false,
}, false);

const chapterNavError = handleActions({
  [fetchChapterNavRequest]: () => null,
  [fetchChapterNavFailure]: (_state, action) => action.payload,
}, null);

const addChapter = handleActions({
  [fetchChapterNavRequest]: () => [],
  [fetchChapterNavSuccess]: (_state, action) => action.payload,
}, []);

const addChapterLoading = handleActions({
  [fetchChapterNavRequest]: () => true,
  [fetchChapterNavSuccess]: () => false,
  [fetchChapterNavFailure]: () => false,
}, false);

const addChapterError = handleActions({
  [fetchChapterNavRequest]: () => null,
  [fetchChapterNavFailure]: (_state, action) => action.payload,
}, null);

const editChapter = handleActions({
  [editFetchChapterRequest]: () => [],
  [editFetchChapterSuccess]: (_state, action) => action.payload,
}, []);

const editChapterLoading = handleActions({
  [editFetchChapterRequest]: () => true,
  [editFetchChapterSuccess]: () => false,
  [editFetchChapterFailure]: () => false,
}, false);

const editChapterError = handleActions({
  [editFetchChapterRequest]: () => null,
  [editFetchChapterFailure]: (_state, action) => action.payload,
}, null);

const changeChapter = handleActions({
  [changeFetchChapterRequest]: () => [],
  [changeFetchChapterSuccess]: (_state, action) => action.payload,
}, []);

const changeChapterLoading = handleActions({
  [changeFetchChapterRequest]: () => true,
  [changeFetchChapterSuccess]: () => false,
  [changeFetchChapterFailure]: () => false,
}, false);

const changeChapterError = handleActions({
  [changeFetchChapterRequest]: () => null,
  [changeFetchChapterFailure]: (_state, action) => action.payload,
}, null);

const deleteChapter = handleActions({
  [deleteFetchChapterRequest]: () => [],
  [deleteFetchChapterSuccess]: (_state, action) => action.payload,
}, []);

const deleteChapterLoading = handleActions({
  [deleteFetchChapterRequest]: () => true,
  [deleteFetchChapterSuccess]: () => false,
  [deleteFetchChapterFailure]: () => false,
}, false);

const deleteChapterError = handleActions({
  [deleteFetchChapterRequest]: () => null,
  [deleteFetchChapterFailure]: (_state, action) => action.payload,
}, null);

const setDeleteChapter = handleActions({
  [deleteChapterOrder]: (_state, action) => { 
    return _state},
}, []);

const sortChapter = handleActions({
  [sortFetchChapterRequest]: () => [],
  [sortFetchChapterSuccess]: (_state, action) => action.payload,
}, []);

const sortChapterLoading = handleActions({
  [sortFetchChapterRequest]: () => true,
  [sortFetchChapterSuccess]: () => false,
  [sortFetchChapterFailure]: () => false,
}, false);

const sortChapterError = handleActions({
  [sortFetchChapterRequest]: () => null,
  [sortFetchChapterFailure]: (_state, action) => action.payload,
}, null);

const addLink = handleActions({
  [addLinkChapter]: (_state, action) => {
    return action.payload
  },
  [fetchChaptersSuccess]: (_state, action) => {
    return false
  }
}, false);

const likesChapter = handleActions({
  [fetchLikeChapterRequest]: () => [],
  [fetchLikeChapterSuccess]: (_state, action) => action.payload,
}, []);

const likesChapterLoading = handleActions({
  [fetchLikeChapterRequest]: () => true,
  [fetchLikeChapterSuccess]: () => false,
  [fetchLikeChapterFailure]: () => false,
}, false);

const likesChapterError = handleActions({
  [fetchLikeChapterRequest]: () => null,
  [fetchLikeChapterFailure]: (_state, action) => action.payload,
}, null);

export default combineReducers({
  chapters,
  chaptersLoading,
  chaptersError,

  chapter,
  chapterLoading,
  chapterError,

  chapterNav,
  chapterNavLoading,
  chapterNavError,

  addChapter,
  addChapterLoading,
  addChapterError,
  addLink,

  editChapter,
  editChapterLoading,
  editChapterError,

  changeChapter,
  changeChapterLoading,
  changeChapterError,

  deleteChapter,
  deleteChapterLoading,
  deleteChapterError,
  setDeleteChapter,

  sortChapter,
  sortChapterLoading,
  sortChapterError,

  likesChapter,
  likesChapterLoading,
  likesChapterError
});