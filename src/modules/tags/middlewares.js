import {
  fetchTagsRequest,
  fetchTagsSuccess,
  fetchTagsFailure,
  } from './actions';
  
  export const getTagsMiddleware = store => next => action => {
    if (action.type === fetchTagsRequest.toString()) {
      const headers = {['Content-Type']: 'application/json'} 
      const method = 'GET'

      fetch(`/api/tags`, { method, headers })
        .then(response => {
          return response.json()})
        .then(tags => {
          store.dispatch(fetchTagsSuccess(tags));
        })
        .catch(error => {
          store.dispatch(fetchTagsFailure(error));
        });
    }
    return next(action);
  };
  