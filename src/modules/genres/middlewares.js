import {
  fetchGenresRequest,
  fetchGenresSuccess,
  fetchGenresFailure,
  } from './actions';
  
  export const getGenresMiddleware = store => next => action => {
    if (action.type === fetchGenresRequest.toString()) {
      const headers = {['Content-Type']: 'application/json'} 
      const method = 'GET'

      fetch(`/api/genres`, { method, headers })
        .then(response => {
          return response.json()})
        .then(genres => {
          store.dispatch(fetchGenresSuccess(genres));
        })
        .catch(error => {
          store.dispatch(fetchGenresFailure(error));
        });
    }
    return next(action);
  };
  