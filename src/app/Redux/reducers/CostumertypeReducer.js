import { ACTION_TYPES } from "../actions/CostumertypeActions"

const INITIAL_STATE = {
  list: [],
  selected_costumertype: {
    id: 0,
    name: "",
    concurrencyStamp: null,
    createdUser: "",
    updatedUser: null,
    deleteUser: null,
    createTime: null,
    updateTime: null,
    deleteTime: null,
    isActive: true,
    departmentstxt : "",
    departments : []
  },
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const CostumertypeReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLCOSTUMERTYPES_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLCOSTUMERTYPES_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLCOSTUMERTYPES_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCOSTUMERTYPE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDCOSTUMERTYPE_SUCCESS:
      return { ...state, selected_costumertype: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCOSTUMERTYPE_ERROR:
      return { ...state, errmsg: payload, isLoading: true }
    case ACTION_TYPES.REMOVE_SELECTEDCOSTUMERTYPE:
      return { ...state, selected_costumertype: {}, isSelected: false }
    case ACTION_TYPES.EDIT_COSTUMERTYPE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_COSTUMERTYPE_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_COSTUMERTYPE_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.ADD_COSTUMERTYPE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.ADD_COSTUMERTYPE_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.ADD_COSTUMERTYPE_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_COSTUMERTYPE_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_COSTUMERTYPE_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_COSTUMERTYPE_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}