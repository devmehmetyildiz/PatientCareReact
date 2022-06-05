import { ACTION_TYPES } from "../actions/RoleActions";

const INITIAL_STATE = {
    list: [],
    selected_role: {},
    errmsg: "",
    isLoading: false,
    isSelected: false,
    isModalOpen: false,
    roles : []
}

export const roleReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_ROLES_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ROLES_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_ROLES_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDROLE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_SELECTEDROLE_SUCCESS:
            return { ...state, selected_role: payload, isSelected: true, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDROLE_ERROR:
            return { ...state, errmsg: payload, isLoading: true }
        case ACTION_TYPES.REMOVE_SELECTEDROLE:
            return { ...state, selected_role: {}, isSelected: false }
        case ACTION_TYPES.EDIT_ROLE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.EDIT_ROLE_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.EDIT_ROLE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.ADD_ROLE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.ADD_ROLE_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.ADD_ROLE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_ROLE_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.DELETE_ROLE_SUCCESS:
            return { ...state, isLoading: false, isModalOpen: false }
        case ACTION_TYPES.DELETE_ROLE_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ACTION_TYPES.DELETE_MODAL_CLOSE:
            return { ...state, isModalOpen: false }
        case ACTION_TYPES.GET_AUTHORY_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_AUTHORY_SUCCESS:
            return { ...state, roles: payload, isLoading: false }
        case ACTION_TYPES.GET_AUTHORY_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        default:
            return state;
    }
}