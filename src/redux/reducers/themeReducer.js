import { CHANGE_THEME_MODE } from "../actions/types";

const initialState = {
  mode: "light",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_THEME_MODE:
      return {
        ...state,
        mode: state.mode === "dark" ? "light" : "dark",
      };
    default:
      return state;
  }
};

export default themeReducer;
