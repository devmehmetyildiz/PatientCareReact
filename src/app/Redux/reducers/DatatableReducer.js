import { ACTION_TYPES } from "../actions/DatatableActions"

const INITIAL_STATE = {
    list: [],
    selecteditem: [],
    errmsg: "",
    isLoading: false,
    isModalOpen: false

}

export const DatatableReducer = (state = INITIAL_STATE, { type, payload }) => {

    switch (type) {
        case ACTION_TYPES.GET_ALLDATATABLES_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ALLDATATABLES_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_ALLDATATABLES_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.EDIT_DATATABLE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.EDIT_DATATABLE_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.EDIT_DATATABLE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.CREATE_DATATABLE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.CREATE_DATATABLE_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.CREATE_DATATABLE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.UPDATE_ITEM:
            return { ...state, selecteditem: payload }
        case ACTION_TYPES.MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ACTION_TYPES.MODAL_CLOSE:
            return { ...state, isModalOpen: false }
        default:
            return state;
    }
}