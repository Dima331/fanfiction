import { createAction } from 'redux-actions';

export const fetchAddUserRequest = createAction('FETCH_ADD_USER_REQUEST');
export const fetchAddUserSuccess = createAction('FETCH_ADD_USER_SUCCESS');
export const fetchAddUserFailure = createAction('FETCH_ADD_USER_FAILURE');

export const fetchTokenUserRequest = createAction('FETCH_TOKEN_USER_REQUEST');
export const fetchTokenUserSuccess = createAction('FETCH_TOKEN_USER_SUCCESS');
export const fetchTokenUserFailure = createAction('FETCH_TOKEN_USER_FAILURE');

export const fetchLoginUserRequest = createAction('FETCH_LOGIN_USER_REQUEST');
export const fetchLoginUserSuccess = createAction('FETCH_LOGIN_USER_SUCCESS');
export const fetchLoginUserFailure = createAction('FETCH_LOGIN_USER_FAILURE');

export const fetchEditUserRequest = createAction('FETCH_EDIT_USER_REQUEST');
export const fetchEditUserSuccess = createAction('FETCH_EDIT_USER_SUCCESS');
export const fetchEditUserFailure = createAction('FETCH_EDIT_USER_FAILURE');

export const fetchDeleteUserRequest = createAction('FETCH_DELETE_USER_REQUEST');
export const fetchDeleteUserSuccess = createAction('FETCH_DELETE_USER_SUCCESS');
export const fetchDeleteUserFailure = createAction('FETCH_DELETE_USER_FAILURE');

export const fetchBlockUserRequest = createAction('FETCH_BLOCK_USER_REQUEST');
export const fetchBlockUserSuccess = createAction('FETCH_BLOCK_USER_SUCCESS');
export const fetchBlockUserFailure = createAction('FETCH_BLOCK_USER_FAILURE');

export const fetchAdminUserRequest = createAction('FETCH_ADMIN_USER_REQUEST');
export const fetchAdminUserSuccess = createAction('FETCH_ADMIN_USER_SUCCESS');
export const fetchAdminUserFailure = createAction('FETCH_ADMIN_USER_FAILURE');

export const fetchUsersRequest = createAction('FETCH_USERS_REQUEST');
export const fetchUsersSuccess = createAction('FETCH_USERS_SUCCESS');
export const fetchUsersFailure = createAction('FETCH_USERS_FAILURE');

export const fetchUserRequest = createAction('FETCH_USER_REQUEST');
export const fetchUserSuccess = createAction('FETCH_USER_SUCCESS');
export const fetchUserFailure = createAction('FETCH_USER_FAILURE');

export const fetchChangeUserRequest = createAction('FETCH_CHANGE_USER_REQUEST');
export const fetchChangeUserSuccess = createAction('FETCH_CHANGE_USER_SUCCESS');
export const fetchChangeUserFailure = createAction('FETCH_CHANGE_USER_FAILURE');

export const fetchLoginOutUser = createAction('FETCH_LOGIN_OUT_USER');
export const checkLoginUser = createAction('CHECK_LOGIN_USER');
export const checkTokenUser = createAction('CHECK_TOKEN_USER');

