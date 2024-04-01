import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GET_USER_DATA } from "./types";

toast.configure();

export const getUserData = () => (dispatch) => {
  axios
    .post(`https://realestatemasr.com/shomol/public/api/auth/user-profile`, {
      token: localStorage.getItem("token"),
    })
    .then((res) => {
      dispatch({
        type: GET_USER_DATA,
        payload: res?.data,
      });
    });
};

export const reduxPost =
  (endPoint, data, callBack, setErr, setLoading, uniqueConst) => (dispatch) => {
    setLoading(true);
    axios
      .post(`https://realestatemasr.com/shomol/public/api/${endPoint}`, data)
      .then((res) => {
        callBack(res);
        setLoading(false);
        dispatch({
          type: uniqueConst,
          payload: res,
        });
      })
      .catch((err) => {
        setErr(err?.response);
        setLoading(false);
      });
  };
