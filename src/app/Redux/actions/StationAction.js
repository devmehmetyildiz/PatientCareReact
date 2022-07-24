import axios from "axios"
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup"
import { ROUTES } from "../../Utils/Constants";

export const ACTION_TYPES = {
    GET_ALLSTATIONS_INIT: `GET_ALLSTATIONS_INIT`,
    GET_ALLSTATIONS_SUCCESS: `GET_ALLSTATIONS_SUCCESS`,
    GET_ALLSTATIONS_ERROR: `GET_ALLSTATIONS_ERROR`,

    GET_SELECTEDSTATION_INIT: `GET_SELECTEDSTATION_INIT`,
    GET_SELECTEDSTATION_SUCCESS: `GET_SELECTEDSTATION_SUCCESS`,
    GET_SELECTEDSTATION_ERROR: `GET_SELECTEDSTATION_ERROR`,

    GET_STATIONBYUSER_INIT: `GET_STATIONBYUSER_INIT`,
    GET_STATIONBYUSER_SUCCESS: `GET_STATIONBYUSER_SUCCESS`,
    GET_STATIONBYUSER_ERROR: `GET_STATIONBYUSER_ERROR`,

    GET_STATIONBYDEPARTMENT_INIT: `GET_STATIONBYDEPARTMENT_INIT`,
    GET_STATIONBYDEPARTMENT_SUCCESS: `GET_STATIONBYDEPARTMENT_SUCCESS`,
    GET_STATIONBYDEPARTMENT_ERROR: `GET_STATIONBYDEPARTMENT_ERROR`,

    REMOVE_SELECTEDSTATION: `REMOVE_SELECTEDSTATION`,
    REMOVE_FILTEREDSTATION: `REMOVE_FILTEREDSTATION`,

    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_STATION_INIT: `CREATE_STATION_INIT`,
    CREATE_STATION_SUCCESS: `CREATE_STATION_SUCCESS`,
    CREATE_STATION_ERROR: `CREATE_STATION_ERROR`,

    EDIT_STATION_INIT: `EDIT_STATION_INIT`,
    EDIT_STATION_SUCCESS: `EDIT_STATION_SUCCESS`,
    EDIT_STATION_ERROR: `EDIT_STATION_ERROR`,

    DELETE_STATION_INIT: `DELETE_STATION_INIT`,
    DELETE_STATION_SUCCESS: `DELETE_STATION_SUCCESS`,
    DELETE_STATION_ERROR: `DELETE_STATION_ERROR`,
}

export const GetStationsByUser = (UserID) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_STATIONBYUSER_INIT })
    await axios({
        method: `post`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.STATION}/GetStationsByUser`,
        data: UserID,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_STATIONBYUSER_SUCCESS, payload: response.data }) })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_STATIONBYUSER_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.STATION, "GetStationsByUser")
        })
}

export const GetStationByDepartments = (Departments) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_STATIONBYDEPARTMENT_INIT })
    await axios({
        method: `post`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.STATION}/GetStationsByDepartments`,
        data: Departments,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_STATIONBYDEPARTMENT_SUCCESS, payload: response.data }) })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_STATIONBYDEPARTMENT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.STATION, "GetStationsByDepartments")
        })
}

export const GetAllStations = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.STATION}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_SUCCESS, payload: response.data }) })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.STATION, "GetAll")
        })
}

export const GetSelectedStation = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDSTATION_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.STATION}/GetSelectedStation?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDSTATION_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDSTATION_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.STATION, "GetSelectedStation")
        })
};

export const CreateStation = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_STATION_INIT })
    await axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.STATION}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_STATION_SUCCESS })
            Popup("Success", "İstasyonlar", "İstasyon Eklendi")
            historypusher.push("/Stations")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_STATION_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.STATION, "Add")
        })
}

export const UpdateStation = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_STATION_INIT })
    await axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.STATION}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_STATION_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDSTATION })
            Popup("Success", "İstasyonlar", "İstasyon Güncellendi")
            historypusher.push("/Stations")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_STATION_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.STATION, "Update")
        })
}

export const DeleteStation = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_STATION_INIT })
    await axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/Station/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_STATION_SUCCESS })
            Popup("Success", "İstasyonlar", "İstasyon Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_STATION_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.STATION, "Delete")
        })
}

export const ClearfilteredStation = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_FILTEREDSTATION })
}

export const ClearSelectedStation = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDSTATION })
}

export const OpenDeleteModal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDSTATION })
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}