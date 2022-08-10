import { ACTION_TYPES } from "../actions/Activestock"

const INITIAL_STATE = {
  list: [],
  selected_activestock: {
    id: 0,
    stockid: "",
    stockname: "",
    stock: {},
    departmentid: "",
    departmentname: "",
    department: {},
    skt: "",
    barcodeno: "",
    amount: "",
    purchaseprice: 0,
    purchasedate: null,
    info: "",
    concurrencyStamp: null,
    createdUser: "",
    updatedUser: null,
    deleteUser: null,
    createTime: null,
    updateTime: null,
    deleteTime: null,
    isActive: true,
    isdeactive: true,
    deactivetime: null
  },
  details: [],
  department: {
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
    isAdded: false,
    stationstxt: "",
    stations: []
  },
  errmsg: "",
  isStockModalOpen: false,
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const ActivestockReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLACTIVESTOCKS_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLACTIVESTOCKS_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLACTIVESTOCKS_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDACTIVESTOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDACTIVESTOCK_SUCCESS:
      return { ...state, selected_activestock: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDACTIVESTOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.REMOVE_SELECTEDACTIVESTOCK:
      return { ...state, selected_activestock: INITIAL_STATE.selected_activestock, isSelected: false }
    case ACTION_TYPES.EDIT_ACTIVESTOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_ACTIVESTOCK_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_ACTIVESTOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.ADD_ACTIVESTOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.ADD_ACTIVESTOCK_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.ADD_ACTIVESTOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_ACTIVESTOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_ACTIVESTOCK_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_ACTIVESTOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.KILL_ACTIVESTOCK_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.KILL_ACTIVESTOCK_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.KILL_ACTIVESTOCK_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    case ACTION_TYPES.CREATESTOCK_MODAL_OPEN:
      return { ...state, isStockModalOpen: true }
    case ACTION_TYPES.CREATESTOCK_MODAL_CLOSE:
      return { ...state, isStockModalOpen: false }
    case ACTION_TYPES.UPDATE_DETAILS:
      return { ...state, details: payload }
    case ACTION_TYPES.UPDATE_DEPARTMENT:
      return { ...state, department: payload }
    case ACTION_TYPES.UPDATE_DEPARTMENTUUI_INIT:
      return { ...state }
    case ACTION_TYPES.UPDATE_DEPARTMENTUUI_SUCCESS:
      return { ...state, department: payload }
    case ACTION_TYPES.UPDATE_DEPARTMENTUUI_ERROR:
      return { ...state, errmsg: payload }
    default:
      return state;
  }
}