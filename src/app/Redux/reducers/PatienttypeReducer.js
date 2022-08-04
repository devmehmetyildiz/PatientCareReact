import { ACTION_TYPES } from "../actions/PatienttypeActions"

const INITIAL_STATE = {
  list: [],
  selected_patienttype: {
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
  },
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const PatienttypeReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_ALLPATIENTTYPES_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ALLPATIENTTYPES_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_ALLPATIENTTYPES_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDPATIENTTYPE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_SELECTEDPATIENTTYPE_SUCCESS:
            return { ...state, selected_patienttype: payload, isSelected: true, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDPATIENTTYPE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.REMOVE_SELECTEDPATIENTTYPE:
            return { ...state, selected_patienttype: INITIAL_STATE.selected_patienttype, isSelected: false }
        case ACTION_TYPES.EDIT_PATIENTTYPE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.EDIT_PATIENTTYPE_SUCCESS:
            return { ...state, isLoading: false }   
        case ACTION_TYPES.EDIT_PATIENTTYPE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.CREATE_PATIENTTYPE_INIT: 
            return { ...state, isLoading: true }
        case ACTION_TYPES.CREATE_PATIENTTYPE_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.CREATE_PATIENTTYPE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_PATIENTTYPE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.DELETE_PATIENTTYPE_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.DELETE_PATIENTTYPE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ACTION_TYPES.DELETE_MODAL_CLOSE:
            return { ...state, isModalOpen: false }
        default:
            return state;
    }
}
