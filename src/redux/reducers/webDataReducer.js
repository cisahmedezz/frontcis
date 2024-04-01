import {
  GET_ABOUT,
  GET_CATEGORIES,
  GET_CONTACT,
  GET_HOME_DATA,
  GET_HOME_PAGE,
  LOADING,
} from "../actions/types";

const initialState = {
  loading: false,
  navbar: {},
};

const webDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_HOME_PAGE:
      return {
        ...state,
        navbar: action.payload,
        loading: false,
      };
    case GET_HOME_DATA:
      return {
        ...state,
        homepage: action.payload,
        loading: false,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_ABOUT:
      return {
        ...state,
        about_us: action.payload,
      };
    case GET_CONTACT:
      return {
        ...state,
        contact_us: action.payload,
      };
    default:
      return state;
  }
};

export default webDataReducer;
