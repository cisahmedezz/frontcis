import api from "../../api";
import { GET_HOME_DATA, GET_HOME_PAGE, LOADING } from "./types";

export const getNavData = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  api.get(`navbar`).then((res) => {
    dispatch({
      type: GET_HOME_PAGE,
      payload: res.data,
    });
  });
};
export const getHomeData = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  api.get(`homepage`).then((res) => {
    dispatch({
      type: GET_HOME_DATA,
      payload: res.data,
    });
  });
};
