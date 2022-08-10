import { ACTION_TYPES } from "../actions/StockmovementActions"

const INITIAL_STATE = {
  list: [],
  selected_list : [],
  errmsg: "",
  stock : {},
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
    case ACTION_TYPES.GET_SELECTEDSTOCKMOVEMENT_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_SELECTEDSTOCKMOVEMENT_SUCCESS:
      return { ...state, selected_list: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDSTOCKMOVEMENT_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDSTOCK_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_SELECTEDSTOCK_SUCCESS:
      return { ...state, stock: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDSTOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    default:
      return state;
  }
}