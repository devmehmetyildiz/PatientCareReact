import { ACTION_TYPES } from "../actions/DepartmentAction"

const INITIAL_STATE = {
  list: [],
  selected_department: {
    id: 0,
    name: "",
    normalizedName: null,
    concurrencyStamp: null,
    createdUser: "",
    updatedUser: null,
    deleteUser: null,
    createTime: null,
    updateTime: null,
    deleteTime: null,
    isActive: true,
    stations : []
  },
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const DepartmentReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_ALLDEPARTMENTS_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ALLDEPARTMENTS_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_ALLDEPARTMENTS_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDDEPARTMENT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_SELECTEDDEPARTMENT_SUCCESS:
            return { ...state, selected_department: payload, isSelected: true, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDDEPARTMENT_ERROR:
            return { ...state, errmsg: payload, isLoading: true }
        case ACTION_TYPES.REMOVE_SELECTEDDEPARTMENT:
            return { ...state, selected_department: {}, isSelected: false }
        case ACTION_TYPES.EDIT_DEPARTMENT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.EDIT_DEPARTMENT_SUCCESS:
            return { ...state, isLoading: false }   
        case ACTION_TYPES.EDIT_DEPARTMENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.CREATE_DEPARTMENT_INIT: 
            return { ...state, isLoading: true }
        case ACTION_TYPES.CREATE_DEPARTMENT_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.CREATE_DEPARTMENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_DEPARTMENT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.DELETE_DEPARTMENT_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.DELETE_DEPARTMENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ACTION_TYPES.DELETE_MODAL_CLOSE:
            return { ...state, isModalOpen: false }
        default:
            return state;
    }
}
