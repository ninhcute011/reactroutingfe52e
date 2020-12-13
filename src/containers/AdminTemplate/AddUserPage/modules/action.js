import * as ActionTypes from "./constants";
import api from "../../../../api";

export const actAddUserApi = (user) => {
  return (dispatch) => {
    dispatch(actAddUserRequest());
    api
      .post("/QuanLyNguoiDung/ThemNguoiDung", user)
      .then((result) => {
        dispatch(actAddUserSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddUserFailed(err));
      });
  };
};

const actAddUserRequest = () => {
  return {
    type: ActionTypes.ADD_USER_REQUEST,
  };
};

const actAddUserSuccess = (data) => {
  return {
    type: ActionTypes.ADD_USER_SUCCESS,
    payload: data,
  };
};

const actAddUserFailed = (err) => {
  return {
    type: ActionTypes.ADD_USER_FAILED,
    payload: err,
  };
};
