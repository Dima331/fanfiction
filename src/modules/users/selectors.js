export const getUserError = state => state.users.error;
export const getUserLoading = state => state.users.loading;
export const getUser = state => state.users.user; 

export const getTokenError = state => state.users.tokenError;
export const getTokenLoading = state => state.users.tokenLoading;
export const getToken = state => state.users.token; 

export const loginUserError = state => state.users.loginUserError;
export const loginUserLoading = state => state.users.loginUserLoading;
export const loginUser = state => state.users.loginUser; 
export const getloginUser = state => state.users.LoadUser; 
export const getTokenUser = state => state.users.checkTokenUser; 

export const getUsers = state => state.users.users; 
export const getTableErrorUser = state => state.users.tableErrorUser; 
export const getEditUserError = state => state.users.editUserError; 
export const getOneUser = state => state.users.getOneUser; 