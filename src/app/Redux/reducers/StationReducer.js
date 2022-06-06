import { ACTION_TYPES } from "../actions/StationAction"
const INITIAL_STATE = {
    list: [],
    selected_station: {
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
        isActive: true
    },
    errmsg: "",
    isLoading: false,
    isSelected: false,
    isModalOpen: false
}

export const StationReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_ALLSTATIONS_INIT:
            return { ...state, isLoading: true };
        case ACTION_TYPES.GET_ALLSTATIONS_SUCCESS:
            return { ...state, list: payload, isLoading: false }
        case ACTION_TYPES.GET_ALLSTATIONS_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDSTATION_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_SELECTEDSTATION_SUCCESS:
            return { ...state, selected_station: payload, isSelected: true, isLoading: false }
        case ACTION_TYPES.GET_SELECTEDSTATION_ERROR:
            return { ...state, errmsg: payload, isLoading: true }
        case ACTION_TYPES.REMOVE_SELECTEDSTATION:
            return { ...state, selected_station: {}, isSelected: false }
        case ACTION_TYPES.EDIT_STATION_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.EDIT_STATION_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.EDIT_STATION_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.CREATE_STATION_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.CREATE_STATION_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.CREATE_STATION_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_STATION_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.DELETE_STATION_SUCCESS:
            return { ...state, isLoading: false }
        case ACTION_TYPES.DELETE_STATION_ERROR:
            return { ...state, errmsg: payload, isLoading: false }
        case ACTION_TYPES.DELETE_MODAL_OPEN:
            return { ...state, isModalOpen: true }
        case ACTION_TYPES.DELETE_MODAL_CLOSE:
            return { ...state, isModalOpen: false }
        default:
            return state;
    }
}
