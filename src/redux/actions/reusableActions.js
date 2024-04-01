import { toast } from "react-hot-toast";
import api from "../api";
import { LOADING, LOGIN_FAILED } from "./types";

const locale = localStorage.getItem("i18nextLng");

export const reduxGet = (endPoint, type, token, errType) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  api
    .get(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({
        type: type,
        payload: res?.data,
      });
    })
    .catch((err) => {
      if (errType === LOGIN_FAILED) {
        toast.error(
          locale !== "ar"
            ? "Your session has been expired"
            : "لقد انتهت صلاحية تسجيل الدخول الخاص بك"
        );
      }
      dispatch({
        type: errType,
        payload: err?.response,
      });
    });
};

export const emptyAction = (type) => (dispatch) => {
  dispatch({
    type,
  });
};

export const reduxPost =
  (endPoint, data, callBack, setErr, setLoading, type) => (dispatch) => {
    setLoading(true);
    api
      .post(endPoint, data)
      .then((res) => {
        callBack(res);
        setLoading(false);
        dispatch({
          type: type,
          payload: res.data,
        });
      })
      .catch((err) => {
        setErr(err?.response);
        setLoading(false);
      });
  };

export const reduxPostAuth =
  (endPoint, data, callBack, setErr, setLoading, type, token) => (dispatch) => {
    setLoading(true);
    api
      .post(endPoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        callBack(res);
        setLoading(false);
        dispatch({
          type: type,
          payload: res.data,
        });
      })
      .catch((err) => {
        setErr(err?.response);
        setLoading(false);
      });
  };
