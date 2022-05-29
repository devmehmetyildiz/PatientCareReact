import { ACTION_TYPES } from "../actions/AuthoryActions";

const INITIAL_STATE = {
    list: [],
    selected_authory: {},
    errmsg: "",
    isLoading: false,
    isSelected: false,
    isModalOpen: false,
    roles : []
}

export const authoryReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_AUTHORIES_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_AUTHORIES_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_AUTHORIES_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDAUTHORY_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_SELECTEDAUTHORY_SUCCESS:
            return { ...state, selected_case: payload, isSelected: true, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDAUTHORY_ERROR:
            return { ...state, errmsg: payload, isLoading: true }
        case ACTION_TYPES.REMOVE_SELECTEDAUTHORY:
            return { ...state, selected_case: {}, isSelected: false }
        case ACTION_TYPES.EDIT_AUTHORY_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.EDIT_AUTHORY_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.EDIT_AUTHORY_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.ADD_AUTHORY_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.ADD_AUTHORY_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.ADD_AUTHORY_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_AUTHORY_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.DELETE_AUTHORY_SUCCESS:
            return { ...state, isLoading: false, isModalOpen: false }
        case ACTION_TYPES.DELETE_AUTHORY_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ACTION_TYPES.DELETE_MODAL_CLOSE:
            return { ...state, isModalOpen: false }
        case ACTION_TYPES.GET_ROLES_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ROLES_SUCCESS:
            return { ...state, roles: payload, isLoading: false }
        case ACTION_TYPES.GET_ROLES_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        default:
            return state;
    }
}