import * as ActionType from "./constanst";
import api from "./../../../../api";
import setHeaders from "./../../../../utils/setHeaders";

const TIME_EXP = 3600000;

export const actAuthApi = (user, history) => {
  return (dispatch) => {
    dispatch(actAuthRequest());
    api
      .post("/QuanLyNguoiDung/DangNhap", user)
      .then((result) => {
        dispatch(actAuthSuccess(result.data));
        if (result.data.maLoaiNguoiDung === "QuanTri") {
          //setHeader Token
          setHeaders(result.data.accessToken);
          //Lưu trạng thái login
          localStorage.setItem("UserAdmin", JSON.stringify(result.data));
          // Redirect qua trang Dashboard
          history.replace("/dashboard");

          //thời gian hết phiên
          const date = new Date().getTime();
          const exp = date + TIME_EXP;
          localStorage.setItem("exp", exp);
          dispatch(setTimeoutLogout(history, TIME_EXP));
        } else {
          return Promise.reject({
            response: { data: "Ban k co quyen truy cap" },
          });
        }
      })
      .catch((err) => {
        dispatch(actAuthFailed(err));
      });
  };
};

export const actLogout = (history) => {
  localStorage.removeItem("UserAdmin");
  localStorage.removeItem("exp");
  //chuyen huong ve trang auth
  history.replace("/auth");
  return {
    type: ActionType.AUTH_CLEAR_DATA,
  };
};

const setTimeoutLogout = (history, expTimeout) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(actLogout(history));
      //tính toán thời gian timeout lại cho chính xác
    }, expTimeout);
  };
};

export const actTryLogin = (history) => {
  return (dispatch) => {
    if (!localStorage.getItem("UserAdmin")) {
      return;
    }

    const exp = localStorage.getItem("exp");
    const date = new Date().getTime();
    if (date > exp) {
      dispatch(actLogout(history));
      return;
    }
    const user = JSON.parse(localStorage.getItem("UserAdmin"));
    setHeaders(user.accessToken);
    dispatch(actAuthSuccess(user));
  };
};

const actAuthRequest = () => {
  return {
    type: ActionType.AUTH_REQUEST,
  };
};

const actAuthSuccess = (data) => {
  return {
    type: ActionType.AUTH_SUCCESS,
    payload: data,
  };
};

const actAuthFailed = (err) => {
  return {
    type: ActionType.AUTH_FAILED,
    payload: err,
  };
};
