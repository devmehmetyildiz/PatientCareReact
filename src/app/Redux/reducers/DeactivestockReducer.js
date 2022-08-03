import { ACTION_TYPES } from "../actions/DeactivestockActions"

const INITIAL_STATE = {
  list: [],
  errmsg: "",
  isLoading: false
}

export const DeactivestockReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_DEACTIVESTOCKS_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_DEACTIVESTOCKS_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_DEACTIVESTOCKS_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    default:
      return state;
  }
}