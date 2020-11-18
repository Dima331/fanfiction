import { createStore, compose, applyMiddleware } from 'redux';
import { deleteFanfictionMiddleware } from './modules/fanfictions';
import { getFanfictionsMiddleware } from './modules/fanfictions';
import { editFanfictionMiddleware } from './modules/fanfictions';
import { getFanfictionMiddleware } from './modules/fanfictions';
import { addFanfictionMiddleware } from './modules/fanfictions';
import { userFanfictionsMiddleware } from './modules/fanfictions';
import { changeFanfictionMiddleware } from './modules/fanfictions';
import { getCommentsMiddleware } from './modules/fanfictions';
import { ratingMiddleware } from './modules/fanfictions';

import { likesChapterMiddleware } from './modules/chapters';
import { sortChapterMiddleware } from './modules/chapters';
import { deleteChapterMiddleware } from './modules/chapters';
import { changeChapterMiddleware } from './modules/chapters';
import { getChapterNavMiddleware } from './modules/chapters';
import { addChapterMiddleware } from './modules/chapters';
import { editChapterMiddleware } from './modules/chapters';
import { getChaptersMiddleware } from './modules/chapters';
import { getChapterMiddleware } from './modules/chapters';

import { getGenresMiddleware } from './modules/genres';
import { getTagsMiddleware } from './modules/tags';

import { registrationMiddleware } from './modules/users';
import { editUserMiddleware } from './modules/users';
import { getUsersMiddleware } from './modules/users';
import { deleteUserMiddleware } from './modules/users';
import { blockUserMiddleware } from './modules/users';
import { adminUserMiddleware } from './modules/users';
import { fetchUserMiddleware } from './modules/users';
import { changeUserMiddleware } from './modules/users';
import { getTokenMiddleware } from './modules/users';
import { loginMiddleware } from './modules/users';



import rootReducer from './modules';

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        deleteFanfictionMiddleware,
        registrationMiddleware,
        adminUserMiddleware,
        fetchUserMiddleware,
        changeUserMiddleware,
        likesChapterMiddleware,
        getUsersMiddleware,
        blockUserMiddleware,
        getFanfictionsMiddleware,
        editFanfictionMiddleware,
        getChapterNavMiddleware,
        deleteUserMiddleware,
        getCommentsMiddleware,
        sortChapterMiddleware,
        editUserMiddleware,
        userFanfictionsMiddleware,
        getFanfictionMiddleware,
        changeChapterMiddleware,
        addFanfictionMiddleware,
        changeFanfictionMiddleware,
        deleteChapterMiddleware,
        editChapterMiddleware,
        loginMiddleware,
        ratingMiddleware,
        getChaptersMiddleware,
        addChapterMiddleware,
        getTokenMiddleware,
        getChapterMiddleware,
        getGenresMiddleware, 
        getTagsMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : noop => noop,
    ),
  );

  return store;
};

export default createAppStore;

// state0 ->  reducers -> state1
//              ↑
//            middleware1
//              ↑
//            middleware0
//              ↑
// action ->  store