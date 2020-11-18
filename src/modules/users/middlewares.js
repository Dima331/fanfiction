import {
  fetchAddUserRequest,
  fetchAddUserSuccess,
  fetchAddUserFailure,
} from './actions';

import {
  fetchTokenUserRequest,
  fetchTokenUserSuccess,
  fetchTokenUserFailure,
} from './actions';

import {
  fetchLoginUserRequest,
  fetchLoginUserSuccess,
  fetchLoginUserFailure,
} from './actions';

import {
  fetchEditUserRequest,
  fetchEditUserSuccess,
  fetchEditUserFailure,
} from './actions';

import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
} from './actions';

import {
  fetchDeleteUserRequest,
  fetchDeleteUserSuccess,
  fetchDeleteUserFailure,
} from './actions';

import {
  fetchBlockUserRequest,
  fetchBlockUserSuccess,
  fetchBlockUserFailure,
} from './actions';

import {
  fetchAdminUserRequest,
  fetchAdminUserSuccess,
  fetchAdminUserFailure,
} from './actions';

import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from './actions';

import {
  fetchChangeUserRequest,
  fetchChangeUserSuccess,
  fetchChangeUserFailure,
} from './actions';

export const changeUserMiddleware = store => next => action => {
  if (action.type === fetchChangeUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' };
    const body = JSON.stringify({userId: action.payload});
    const method = 'POST';

    fetch(`/api/auth/change`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(user => {
        if (user.message) {
          store.dispatch(fetchChangeUserFailure(user));
        } else {
          store.dispatch(fetchChangeUserSuccess(user));
        }
      })
      .catch(error => {
        store.dispatch(fetchChangeUserFailure(error));
      });
  }
  return next(action);
};

export const fetchUserMiddleware = store => next => action => {
  if (action.type === fetchUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' };
    const body = JSON.stringify({userId: action.payload});
    const method = 'POST';

    fetch(`/api/users/getone`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(users => {
        if (users.message) {
          store.dispatch(fetchUserFailure(users));
        } else {
          store.dispatch(fetchUserSuccess(users));
        }
      })
      .catch(error => {
        store.dispatch(fetchUserFailure(error));
      });
  }
  return next(action);
};

export const adminUserMiddleware = store => next => action => {
  if (action.type === fetchAdminUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' };
    const body = JSON.stringify({userId: action.payload});
    const method = 'POST';

    fetch(`/api/users/admin`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(users => {
        if (users.message) {
          store.dispatch(fetchAdminUserFailure(users));
        } else {
          store.dispatch(fetchAdminUserSuccess(users));
        }
      })
      .catch(error => {
        store.dispatch(fetchAdminUserFailure(error));
      });
  }
  return next(action);
};


export const blockUserMiddleware = store => next => action => {
  if (action.type === fetchBlockUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' };
    const body = JSON.stringify({userId: action.payload});
    const method = 'POST';

    fetch(`/api/users/block`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(users => {
        if (users.message) {
          store.dispatch(fetchBlockUserFailure(users));
        } else {
          store.dispatch(fetchBlockUserSuccess(users));
        }
      })
      .catch(error => {
        store.dispatch(fetchBlockUserFailure(error));
      });
  }
  return next(action);
};

export const deleteUserMiddleware = store => next => action => {
  if (action.type === fetchDeleteUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' };
    const body = JSON.stringify({userId: action.payload});
    const method = 'DELETE';

    fetch(`/api/users/delete`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(users => {
        if (users.message) {
          store.dispatch(fetchDeleteUserFailure(users));
        } else {
          store.dispatch(fetchDeleteUserSuccess(users));
        }
      })
      .catch(error => {
        store.dispatch(fetchDeleteUserFailure(error));
      });
  }
  return next(action);
};

export const getUsersMiddleware = store => next => action => {
  if (action.type === fetchUsersRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const method = 'GET'

    fetch(`/api/users/get`, { method, headers })
      .then(response => {
        return response.json()
      })
      .then(users => {
        console.log(users)
        if (users.message) {
          store.dispatch(fetchUsersFailure(users));
        } else {
          store.dispatch(fetchUsersSuccess(users));
        }
      })
      .catch(error => {
        store.dispatch(fetchUsersFailure(error));
      });
  }
  return next(action);
};

export const editUserMiddleware = store => next => action => {
  if (action.type === fetchEditUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/auth/edit`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(user => {
        if (user.message) {
          store.dispatch(fetchEditUserFailure(user));
        } else {
          store.dispatch(fetchEditUserSuccess(user));
        }
      })
      .catch(error => {
        store.dispatch(fetchEditUserFailure(error));
      });
  }
  return next(action);
};

export const registrationMiddleware = store => next => action => {
  if (action.type === fetchAddUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/auth/register`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(user => {
        if (user.message) {
          store.dispatch(fetchAddUserFailure(user));
        } else {
          store.dispatch(fetchAddUserSuccess(user));
        }
      })
      .catch(error => {
        store.dispatch(fetchAddUserFailure(error));
      });
  }
  return next(action);
};
export const getTokenMiddleware = store => next => action => {
  if (action.type === fetchTokenUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'

    fetch(`/api/auth/confirmation`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(user => {
        if (user.message) {
          store.dispatch(fetchTokenUserFailure(user));
        } else {
          store.dispatch(fetchTokenUserSuccess(user));
        }
      })
      .catch(error => {
        store.dispatch(fetchTokenUserFailure(error));
      });
  }
  return next(action);
};

export const loginMiddleware = store => next => action => {
  if (action.type === fetchLoginUserRequest.toString()) {
    const headers = { ['Content-Type']: 'application/json' }
    const body = JSON.stringify(action.payload)
    const method = 'POST'
    
    fetch(`/api/auth/login`, { method, body, headers })
      .then(response => {
        return response.json()
      })
      .then(user => {
        if (user.message) {
          store.dispatch(fetchLoginUserFailure(user));
        } else {
          store.dispatch(fetchLoginUserSuccess(user));
        }
      })
      .catch(error => {
        store.dispatch(fetchLoginUserFailure(error));
      });
  }
  return next(action);
};