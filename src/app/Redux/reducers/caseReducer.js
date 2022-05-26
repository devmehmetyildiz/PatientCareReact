import { ACTION_TYPES } from "../actions/CaseActions"

const INITIAL_STATE = {
  list: [],
  selected_case: {
    id: 0,
    caseGroup: "",
    caseStatus: 0,
    name: "",
    normalizedName: null,
    concurrencyStamp: null,
    createdUser: "",
    updatedUser: null,
    deleteUser: null,
    createTime: null,
    updateTime: null,
    deleteTime: null,
    isActive: true
  },
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
      return { ...state, selected_case: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCASE_ERROR:
      return { ...state, errmsg: payload, isLoading: true }
    case ACTION_TYPES.REMOVE_SELECTEDCASE:
      return { ...state, selected_case: {} }
    default:
      return state;
  }
}