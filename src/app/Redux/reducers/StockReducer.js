import { ACTION_TYPES } from "../actions/StockActions"

const INITIAL_STATE = {
  list: [],
  selected_stock: {
    id: 0,
    name: "",
    description: "",
    unitid: "",
    unittxt :"",
    unit: {},
    stationid: "",
    stationtxt :"",
    station: {},
    departmentid: "",
    departmenttxt :"",
    department: {},
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

export const StockReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLSTOCKS_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLSTOCKS_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLSTOCKS_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDSTOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDSTOCK_SUCCESS:
      return { ...state, selected_stock: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDSTOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: true }
    case ACTION_TYPES.REMOVE_SELECTEDSTOCK:
      return { ...state, selected_stock: {}, isSelected: false }
    case ACTION_TYPES.EDIT_STOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_STOCK_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_STOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.ADD_STOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.ADD_STOCK_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.ADD_STOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_STOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_STOCK_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_STOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}