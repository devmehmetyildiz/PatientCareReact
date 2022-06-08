import { ACTION_TYPES } from "../actions/StationAction"
const INITIAL_STATE = {
    list: [],
    filtered_stations : [],
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
        case ACTION_TYPES.GET_STATIONBYUSER_INIT:
            return { ...state, isLoading: true  }
        case ACTION_TYPES.GET_STATIONBYUSER_SUCCESS:
            return { ...state, isLoading: false , filtered_stations:payload}
        case ACTION_TYPES.GET_STATIONBYUSER_ERROR:
            return { ...state, isLoading: false , errmsg : payload}
        case ACTION_TYPES.GET_STATIONBYDEPARTMENT_INIT:
            return { ...state, isLoading: true }
        case ACTION_TYPES.GET_STATIONBYDEPARTMENT_SUCCESS:
            return { ...state, isLoading: false , filtered_stations:payload}
        case ACTION_TYPES.GET_STATIONBYDEPARTMENT_ERROR:
            return { ...state, isLoading: false , errmsg : payload}
        default:
            return state;
    }
}
