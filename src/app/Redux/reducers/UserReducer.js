import { ACTION_TYPES } from "../actions/UserAction";

const INITIAL_STATE = {
    list: [],
    selected_user: {
        id: 0,
        username: "",
        normalizedUsername: "",
        email: "",
        emailConfirmed: false,
        passwordHash: "",
        accessFailedCount: 0,
        name: "",
        surname: "",
        phoneNumber: "",
        phoneNumberConfirmed: false,
        town: "",
        address: "",
        city: "",
        userID: 0,
        language: "",
        concurrencyStamp: null,
        createdUser: "",
        updatedUser: null,
        deleteUser: null,
        createTime: null,
        updateTime: null,
        deleteTime: null,
        isActive: true,
        stations: [],
        roles: [],
        departments: []
    },
    errmsg: "",
    isLoading: false,
    isSelected: false,
    isModalOpen: false
}

export const UserReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_ALLUSERS_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ALLUSERS_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_ALLUSERS_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDUSER_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_SELECTEDUSER_SUCCESS:
            return { ...state, selected_user: payload, isSelected: true, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDUSER_ERROR:
            return { ...state, errmsg: payload, isLoading: true }
        case ACTION_TYPES.REMOVE_SELECTEDUSER:
            return { ...state, selected_user: INITIAL_STATE.selected_user, isSelected: false }
        case ACTION_TYPES.EDIT_USER_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.EDIT_USER_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.EDIT_USER_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.CREATE_USER_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.CREATE_USER_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.CREATE_USER_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_USER_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.DELETE_USER_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.DELETE_USER_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ACTION_TYPES.DELETE_MODAL_CLOSE:
            return { ...state, isModalOpen: false }
        default:
            return state;
    }
}