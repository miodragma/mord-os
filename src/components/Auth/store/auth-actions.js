import axiosConfig from '../../../axios/axiosConfig';

import { authActions } from './auth.slice';

export const userLogin = user => {
  return async dispatch => {
    const loginUser = async () => {
      return axiosConfig.post('/auth/login', user);
    };

    try {
      const { data: userData } = await loginUser();
      return dispatch(authActions.login(userData));
    } catch (err) {
      const { data, message } = err.response.data
      const errors = [];
      if (data) {
        data.forEach(error => errors.push({
          message: error.msg,
          param: error.param.charAt(0).toUpperCase() + error.param.slice(1)
        }))
      } else {
        errors.push({ message, param: null });
      }
      dispatch(authActions.error(errors));
      throw err;
    }
  }
};

export const userSignup = user => {
  return async dispatch => {
    const signupUser = async () => {
      return axiosConfig.put('/auth/signup', user);
    };

    try {
      const { data: userData } = await signupUser();
      return dispatch(authActions.signup(userData));
    } catch (err) {
      const { data, message } = err.response.data
      const errors = [];
      if (data) {
        data.forEach(error => errors.push({
          message: error.msg,
          param: error.param.charAt(0).toUpperCase() + error.param.slice(1)
        }))
      } else {
        errors.push({ message, param: null });
      }
      dispatch(authActions.error(errors));
      throw err;
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const onGetUser = async () => {
      return axiosConfig.get(`/auth/user`);
    };

    try {
      const { data: userData } = await onGetUser();
      return dispatch(authActions.login(userData));
    } catch (err) {
      const { data, message } = err.response.data
      const errors = [];
      if (data) {
        data.forEach(error => errors.push({
          message: error.msg,
          param: error.param.charAt(0).toUpperCase() + error.param.slice(1)
        }))
      } else {
        errors.push({ message, param: null });
      }
      dispatch(authActions.error(errors));
      throw err;
    }
  }
}
