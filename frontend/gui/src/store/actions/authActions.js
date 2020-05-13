import axios from "axios";
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from "./actionTypes";

export const authStart = () => {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.remove("user");
  localStorage.remove("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeOut = (expirationDate) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationDate * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`http://127.0.0.1:8000/rest-auth/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        expirationDate = new Date(new Date().getDate() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeOut(3600));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`http://127.0.0.1:8000/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        expirationDate = new Date(new Date().getDate() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeOut(3600));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
};
