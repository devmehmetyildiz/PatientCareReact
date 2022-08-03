import { ACTION_TYPES } from "../actions/StockmovementActions"

const INITIAL_STATE = {
  list: [],
  errmsg: "",
  isLoading: false
}

export const StockmovementReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_STOCKMOVEMENTS_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_STOCKMOVEMENTS_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_STOCKMOVEMENTS_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    default:
      return state;
  }
}