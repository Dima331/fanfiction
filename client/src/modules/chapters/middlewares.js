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
} from './actions';

import {
  fetchAddChapterRequest,
  fetchAddChapterSuccess,
  fetchAddChapterFailure,
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
} from './actions';

import {
  sortFetchChapterRequest,
  sortFetchChapterSuccess,
  sortFetchChapterFailure,
} from './actions';

import {
  fetchLikeChapterRequest,
  fetchLikeChapterSuccess,
  fetchLikeChapterFailure,
} from './actions';

export const getChaptersMiddleware = store => next => action => {
  if (action.type === fetchChaptersRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'GET'

    fetch(`/api/chapters/get/${action.payload}`, { method, headers })
      .then(response => {
        return response.json()
      })
      .then(chapters => {
        store.dispatch(fetchChaptersSuccess(chapters));
      })
      .catch(error => {
        store.dispatch(fetchChaptersFailure(error));
      });
  }
  return next(action);
};

export const getChapterMiddleware = store => next => action => {
  if (action.type === fetchChapterRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/chapters/getview`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(chapter => {
        store.dispatch(fetchChapterSuccess(chapter));
      })
      .catch(error => {
        store.dispatch(fetchChapterFailure(error));
      });
  }
  return next(action);
};

export const getChapterNavMiddleware = store => next => action => {
  if (action.type === fetchChapterNavRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/chapters/getnav`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(nav => {
        store.dispatch(fetchChapterNavSuccess(nav));
      })
      .catch(error => {
        store.dispatch(fetchChapterNavFailure(error));
      });
  }
  return next(action);
};

export const addChapterMiddleware = store => next => action => {
  if (action.type === fetchAddChapterRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/chapters/add`, { method, body, headers })
      .then(async response => {
        return response.json()
      })
      .then(async add => {
        store.dispatch(addLinkChapter(add));
        await store.dispatch(fetchAddChapterSuccess());
      })
      .catch(error => {
        store.dispatch(fetchAddChapterFailure(error));
      });
  }
  return next(action);
};

export const editChapterMiddleware = store => next => action => {
  if (action.type === editFetchChapterRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'GET'

    fetch(`/api/chapters/edit/${action.payload}`, { method, headers })
      .then(async response => {
        return response.json()
      })
      .then(async add => {
        store.dispatch(editFetchChapterSuccess(add));
      })
      .catch(error => {
        store.dispatch(editFetchChapterFailure(error));
      });
  }
  return next(action);
};

export const changeChapterMiddleware = store => next => action => {
  if (action.type === changeFetchChapterRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/chapters/change`, { method, body, headers })
      .then(async response => {
        return response.json()
      })
      .then(async add => {
        store.dispatch(changeFetchChapterSuccess(add));
      })
      .catch(error => {
        store.dispatch(changeFetchChapterFailure(error));
      });
  }
  return next(action);
};

export const deleteChapterMiddleware = store => next => action => {
  if (action.type === deleteFetchChapterRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'DELETE'

    fetch(`/api/chapters/delete`, { method, body, headers })
      .then(async response => {
        return response.json()
      })
      .then(async add => {
        store.dispatch(deleteFetchChapterSuccess(add));
      })
      .catch(error => {
        store.dispatch(deleteFetchChapterFailure(error));
      });
  }
  return next(action);
};

export const sortChapterMiddleware = store => next => action => {
  if (action.type === sortFetchChapterRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/chapters/sort`, { method, body, headers })
      .then(async response => {
        return response.json()
      })
      .then(async add => {
        store.dispatch(sortFetchChapterSuccess(add));
      })
      .catch(error => {
        store.dispatch(sortFetchChapterFailure(error));
      });
  }
  return next(action);
};

export const likesChapterMiddleware = store => next => action => {
  if (action.type === fetchLikeChapterRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/chapters/likes`, { method, body, headers })
      .then(async response => {
        return response.json()
      })
      .then(async likes => {
        store.dispatch(fetchLikeChapterSuccess(likes));
      })
      .catch(error => {
        store.dispatch(fetchLikeChapterFailure(error));
      });
  }
  return next(action);
};