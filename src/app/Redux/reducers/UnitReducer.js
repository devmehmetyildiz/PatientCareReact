import { ACTION_TYPES } from "../actions/UnitActions"

const INITIAL_STATE = {
  list: [],
  selected_unit: {
    id: 0,
    unittype: 0,
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

export const UnitReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLUNITS_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLUNITS_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLUNITS_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDUNIT_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDUNIT_SUCCESS:
      return { ...state, selected_unit: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDUNIT_ERROR:
      return { ...state, errmsg: payload, isLoading: true }
    case ACTION_TYPES.REMOVE_SELECTEDUNIT:
      return { ...state, selected_unit: {}, isSelected: false }
    case ACTION_TYPES.EDIT_UNIT_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_UNIT_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_UNIT_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.ADD_UNIT_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.ADD_UNIT_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.ADD_UNIT_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_UNIT_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_UNIT_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_UNIT_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}