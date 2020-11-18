import {
  fetchFanfictionsRequest,
  fetchFanfictionsSuccess,
  fetchFanfictionsFailure,
} from './actions';

import {
  fetchFanfictionRequest,
  fetchFanfictionSuccess,
  fetchFanfictionFailure,
} from './actions';

import {
  fetchAddFanfictionRequest,
  fetchAddFanfictionSuccess,
  fetchAddFanfictionFailure,
} from './actions';

import {
  fetchEditFanfictionRequest,
  fetchEditFanfictionSuccess,
  fetchEditFanfictionFailure,
} from './actions';

import {
  fetchChangeFanfictionRequest,
  fetchChangeFanfictionSuccess,
  fetchChangeFanfictionFailure,
} from './actions';

import {
  fetchDeleteFanfictionRequest,
  fetchDeleteFanfictionSuccess,
  fetchDeleteFanfictionFailure,
  addLinkFanfiction
} from './actions';

import {
  fetchUserFanfictionsRequest,
  fetchUserFanfictionsSuccess,
  fetchUserFanfictionsFailure,
} from './actions';

import {
  fetchRatingRequest,
  fetchRatingSuccess,
  fetchRatingFailure,
} from './actions';

import {
  fetchCommentsFanfictionRequest,
  fetchCommentsFanfictionSuccess,
  fetchCommentsFanfictionFailure,
} from './actions';

export const getCommentsMiddleware = store => next => action => {
  if (action.type === fetchCommentsFanfictionRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'GET'

    fetch(`/api/fanfictions/comments/${action.payload}`, { method, headers })
      .then(response => {
        return response.json()
      })
      .then(comments => {
        store.dispatch(fetchCommentsFanfictionSuccess(comments));
      })
      .catch(error => {
        store.dispatch(fetchCommentsFanfictionFailure(error));
      });
  }
  return next(action);
};

export const getFanfictionsMiddleware = store => next => action => {
  if (action.type === fetchFanfictionsRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'GET'

    fetch(`/api/fanfictions/view`, { method, headers })
      .then(response => {
        return response.json()
      })
      .then(fanfictions => {
        store.dispatch(fetchFanfictionsSuccess(fanfictions));
      })
      .catch(error => {
        store.dispatch(fetchFanfictionsFailure(error));
      });
  }
  return next(action);
};

export const getFanfictionMiddleware = store => next => action => {
  if (action.type === fetchFanfictionRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'GET'

    fetch(`/api/fanfictions/view/${action.payload}`, { method, headers })
      .then(response => {
        return response.json()
      })
      .then(fanfictions => {
        if (fanfictions.message) {
          store.dispatch(fetchFanfictionFailure(fanfictions));
        } else {
          store.dispatch(fetchFanfictionSuccess(fanfictions));
        }
      })
      .catch(error => {
        store.dispatch(fetchFanfictionFailure(error));
      });
  }
  return next(action);
};

export const addFanfictionMiddleware = store => next => async action => {
  if (action.type === fetchAddFanfictionRequest.toString()) {
    let headers = { ['Content-Type']: 'application/json' }
    const method = 'POST'
    const body = JSON.stringify(action.payload.form)
    headers.authorization = `Bearer ${action.payload.token.token}`

    await fetch(`/api/fanfictions/add`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(async add => {
        await store.dispatch(fetchAddFanfictionSuccess(add));
      })
      .catch(error => {
        store.dispatch(fetchAddFanfictionFailure(error));
      });
  }
  return next(action);
};

export const changeFanfictionMiddleware = store => next => action => {
  if (action.type === fetchChangeFanfictionRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'POST'
    const body = JSON.stringify(action.payload)

    fetch(`/api/fanfictions/change`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(edit => {
        store.dispatch(fetchChangeFanfictionSuccess(edit));
      })
      .catch(error => {
        store.dispatch(fetchChangeFanfictionFailure(error));
      });
  }
  return next(action);
};

export const editFanfictionMiddleware = store => next => action => {
  if (action.type === fetchEditFanfictionRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'POST'
    const body = JSON.stringify({userId: action.payload.token.user.id})
    headers.authorization = `Bearer ${action.payload.token.token}`
    
    fetch(`/api/fanfictions/edit/${action.payload.linkId}`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(edit => {
        store.dispatch(fetchEditFanfictionSuccess(edit));
      })
      .catch(error => {
        store.dispatch(fetchEditFanfictionFailure(error));
      });
  }
  return next(action);
};

export const deleteFanfictionMiddleware = store => next => action => {
  if (action.type === fetchDeleteFanfictionRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'DELETE'
    const body = JSON.stringify({
      id: action.payload, 
    })

    fetch(`/api/fanfictions/delete`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(fanfiction => {
        store.dispatch(fetchDeleteFanfictionSuccess(fanfiction));
        // store.dispatch(fetchFanfictionsRequest())
      })
      .catch(error => {
        store.dispatch(fetchDeleteFanfictionFailure(error));
      });
  }
  return next(action);
};

export const userFanfictionsMiddleware = store => next => action => {
  if (action.type === fetchUserFanfictionsRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'POST'
    const body = JSON.stringify({id: action.payload})

    fetch(`/api/fanfictions/user`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(fanfictions => {
        store.dispatch(fetchUserFanfictionsSuccess(fanfictions));
      })
      .catch(error => {
        store.dispatch(fetchUserFanfictionsFailure(error));
      });
  }
  return next(action);
};
export const ratingMiddleware = store => next => action => {
  if (action.type === fetchRatingRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'POST'
    const body = JSON.stringify(action.payload)

    fetch(`/api/fanfictions/rating`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(rating => {
        store.dispatch(fetchRatingSuccess(rating));
      })
      .catch(error => {
        store.dispatch(fetchRatingFailure(error));
      });
  }
  return next(action);
};