import { loginStart, loginSuccess, loginFailure, logoutStart, logoutSuccess, logoutFailure } from './auth-slice';
import { publicRequest } from '../request-methods';

export const login = (user) => {
  return async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await publicRequest.post('/auth/login', user);  
      const token = response.data.token;
      const username = user.username;   
      dispatch(loginSuccess({token, username}));
      window.localStorage.setItem("userData",JSON.stringify({username,token}))
    } catch (err) {
      console.log("enter login error block")
      dispatch(loginFailure());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutStart());
    try {
      dispatch(logoutSuccess());
    } catch (err) {
      console.log("enter logout error block")
      dispatch(logoutFailure());
    }
  };
};