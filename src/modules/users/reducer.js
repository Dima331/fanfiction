import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
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
  fetchLoginOutUser,
  checkLoginUser,
  checkTokenUser
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

const chageUser = handleActions(
  {
    [fetchChangeUserRequest]: () => [],
    [fetchChangeUserSuccess]: (_state, action) => action.payload,
  },
  [],
);

const changeLoading = handleActions(
  {
    [fetchChangeUserRequest]: () => true,
    [fetchChangeUserSuccess]: () => false,
    [fetchChangeUserFailure]: () => false,
  },
  false,
);

const changeError = handleActions(
  {
    [fetchChangeUserRequest]: () => null,
    [fetchChangeUserFailure]: (_state, action) => {
      return action.payload
    },
  },
  null,
);

const getOneUser = handleActions(
  {
    [fetchUserRequest]: () => [],
    [fetchUserSuccess]: (_state, action) => action.payload,
  },
  [],
);

const getUserOneLoading = handleActions(
  {
    [fetchUserRequest]: () => true,
    [fetchUserSuccess]: () => false,
    [fetchUserFailure]: () => false,
  },
  false,
);

const getUserOneError = handleActions(
  {
    [fetchUserRequest]: () => null,
    [fetchUserFailure]: (_state, action) => {
      return action.payload
    },
  },
  null,
);

const users = handleActions(
  {
    [fetchUsersRequest]: () => [],
    [fetchUsersSuccess]: (_state, action) => action.payload,
    [fetchDeleteUserSuccess]:  (_state, action) => {
      _state = _state.filter((item)=> {
        if(action.payload.id !== item.id) {
          return true
        } 
      })
      return _state
    },
    [fetchBlockUserSuccess]:  (_state, action) => {
      _state = _state.map((item)=> {
        if(action.payload.id == item.id) {
          item.status = !+item.status
        } 
        return item
      })
      return _state
    },
    [fetchAdminUserSuccess]:  (_state, action) => {
      _state = _state.map((item)=> {
        if(action.payload.id == item.id) {
          item.role = !+item.role
        } 
        return item
      })
      return _state
    }
  },
  [],
);

const tableErrorUser = handleActions(
  {
    [fetchDeleteUserRequest]: () => null,
    [fetchDeleteUserFailure]: (_state, action) => {
      return action.payload
    },  
    [fetchBlockUserRequest]: () => null,
    [fetchBlockUserFailure]: (_state, action) => {
      return action.payload
    },
     [fetchAdminUserRequest]: () => null,
    [fetchAdminUserFailure]: (_state, action) => {
      return action.payload
    },
  },
  null,
);

const usersLoading = handleActions(
  {
    [fetchUsersRequest]: () => true,
    [fetchUsersSuccess]: () => false,
    [fetchUsersFailure]: () => false,
  },
  false,
);

const usersError = handleActions(
  {
    [fetchUsersRequest]: () => null,
    [fetchUsersFailure]: (_state, action) => {
      return action.payload
    },
  },
  null,
);

const editUser = handleActions(
  {
    [fetchEditUserRequest]: () => [],
    [fetchEditUserSuccess]: (_state, action) => action.payload,
  },
  [],
);

const editUserLoading = handleActions(
  {
    [fetchEditUserRequest]: () => true,
    [fetchEditUserSuccess]: () => false,
    [fetchEditUserFailure]: () => false,
  },
  false,
);

const editUserError = handleActions(
  {
    [fetchEditUserRequest]: () => null,
    [fetchEditUserFailure]: (_state, action) => {
      return action.payload
    },
  },
  null,
);

const user = handleActions(
  {
    [fetchAddUserRequest]: () => [],
    [fetchAddUserSuccess]: (_state, action) => action.payload,
  },
  [],
);

const loading = handleActions(
  {
    [fetchAddUserRequest]: () => true,
    [fetchAddUserSuccess]: () => false,
    [fetchAddUserFailure]: () => false,
  },
  false,
);

const error = handleActions(
  {
    [fetchAddUserRequest]: () => null,
    [fetchAddUserFailure]: (_state, action) => {
      console.log(action.payload)
      return action.payload
    },
  },
  null,
);

const token = handleActions(
  {
    [fetchTokenUserRequest]: () => [],
    [fetchTokenUserSuccess]: (_state, action) => action.payload,
  },
  [],
);

const tokenLoading = handleActions(
  {
    [fetchTokenUserRequest]: () => true,
    [fetchTokenUserSuccess]: () => false,
    [fetchTokenUserFailure]: () => false,
  },
  false,
);

const tokenError = handleActions(
  {
    [fetchTokenUserRequest]: () => null,
    [fetchTokenUserFailure]: (_state, action) => action.payload,
  },
  null,
);

const loginUser = handleActions(
  {
    [fetchLoginUserRequest]: () => null,
    [fetchLoginUserSuccess]: (_state, action) => {
      const { token, user } = action.payload

      localStorage.setItem('userData', JSON.stringify({
        user: user, token: token }))

      return action.payload
    },
    [fetchLoginOutUser]: () => {
      localStorage.removeItem('userData')
      return null
    },
    [fetchDeleteUserSuccess]:  (_state, action) => {
      const data = JSON.parse(localStorage.getItem('userData'))

      if (data.user.id == action.payload.id) {
        localStorage.removeItem('userData')
        return null
      }

      return _state
    },
    [fetchAdminUserSuccess]:  (_state, action) => {
      const data = JSON.parse(localStorage.getItem('userData'))

      if (data.user.id == action.payload.id) {
        localStorage.removeItem('userData')
        return null
      }

      return _state
    },
    [fetchBlockUserSuccess]: (_state, action) => {
      const data = JSON.parse(localStorage.getItem('userData'))

      if (data.user.id == action.payload.id) {
        localStorage.removeItem('userData')
        return null
      }

      return _state
    },
    [checkLoginUser]: () => {
      const data = JSON.parse(localStorage.getItem('userData'))

      if (data && data.token) {
        return data
      }

      return null
    },
    [fetchEditUserSuccess]: (_state, action) => {
      if(_state.user.id === action.payload.id){
           _state.user = action.payload
           localStorage.setItem('userData', JSON.stringify({
           user: action.payload, token: _state.token,
        }))
      }

      return _state
    },
    [fetchChangeUserSuccess]: (_state, action) => {
      const { token, user } = action.payload

      localStorage.setItem('userData', JSON.stringify({
        user: user, token: token }))

      return action.payload
    }
    
  },
  null,
);
const Token = handleActions(
  {
  [checkTokenUser]:  (_state, action) => {
    return action.payload.token}
}, null);

const LoadUser = handleActions(
  {
  [checkLoginUser]: () => true,
  }, 
false);

const loginUserLoading = handleActions(
  {
    [fetchLoginUserRequest]: () => true,
    [fetchLoginUserSuccess]: () => false,
    [fetchLoginUserFailure]: () => false,
  },
  false,
);

const loginUserError = handleActions(
  {
    [fetchLoginUserRequest]: () => null,
    [fetchLoginUserFailure]: (_state, action) => {
      console.log(action.payload)
      return action.payload
    },
  },
  null,
);



export default combineReducers({
  user,
  loading,
  error,

  token,
  tokenLoading,
  tokenError,

  loginUser,
  loginUserLoading,
  loginUserError,
  LoadUser, 
  Token,

  editUser,
  editUserLoading,
  editUserError,

  users,
  usersLoading,
  usersError,
  tableErrorUser,
  getOneUser
});