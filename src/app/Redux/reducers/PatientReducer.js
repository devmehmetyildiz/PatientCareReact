import { ACTION_TYPES } from "../actions/PatientActions"

const INITIAL_STATE = {
  list: [],
  selected_patient: {
    id: 0,
    name: "",
    surname: "",
    countryID: "",
    patienttypeid: "",
    patienttypetxt: "",
    patienttype: {},
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

export const PatientReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_ALLPATIENTS_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ALLPATIENTS_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_ALLPATIENTS_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDPATIENT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_SELECTEDPATIENT_SUCCESS:
            return { ...state, selected_patient: payload, isSelected: true, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDPATIENT_ERROR:
            return { ...state, errmsg: payload, isLoading: true }
        case ACTION_TYPES.REMOVE_SELECTEDPATIENT:
            return { ...state, selected_patient: {}, isSelected: false }
        case ACTION_TYPES.EDIT_PATIENT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.EDIT_PATIENT_SUCCESS:
            return { ...state, isLoading: false }   
        case ACTION_TYPES.EDIT_PATIENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.CREATE_PATIENT_INIT: 
            return { ...state, isLoading: true }
        case ACTION_TYPES.CREATE_PATIENT_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.CREATE_PATIENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_PATIENT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.DELETE_PATIENT_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.DELETE_PATIENT_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ACTION_TYPES.DELETE_MODAL_CLOSE:
            return { ...state, isModalOpen: false }
        default:
            return state;
    }
}
