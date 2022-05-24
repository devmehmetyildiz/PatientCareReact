import { ACTION_TYPES } from "../actions/CaseActions"

INITIAL_STATE = {
  list: [],
  selected_item: {},
  errmsg: "",
  isLoading: false
}

export const caseReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLCASES_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLCASES_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLCASES_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCASE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDCASE_SUCCESS:
      return { ...state, selected_item: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCASE_ERROR:
      return { ...state, errmsg: payload, isLoading: true }
    case ACTION_TYPES.REMOVE_SELECTEDCASE:
      return { ...state, selected_item: {} }
    default:
      return state;
  }
}