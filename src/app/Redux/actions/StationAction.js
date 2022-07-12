import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup"

export const ACTION_TYPES = {
    GET_ALLSTATIONS_INIT: 'GET_ALLSTATIONS_INIT',
    GET_ALLSTATIONS_SUCCESS: 'GET_ALLSTATIONS_SUCCESS',
    GET_ALLSTATIONS_ERROR: 'GET_ALLSTATIONS_ERROR',

    GET_SELECTEDSTATION_INIT: 'GET_SELECTEDSTATION_INIT',
    GET_SELECTEDSTATION_SUCCESS: 'GET_SELECTEDSTATION_SUCCESS',
    GET_SELECTEDSTATION_ERROR: 'GET_SELECTEDSTATION_ERROR',

    GET_STATIONBYUSER_INIT: 'GET_STATIONBYUSER_INIT',
    GET_STATIONBYUSER_SUCCESS: 'GET_STATIONBYUSER_SUCCESS',
    GET_STATIONBYUSER_ERROR: 'GET_STATIONBYUSER_ERROR',

    GET_STATIONBYDEPARTMENT_INIT: 'GET_STATIONBYDEPARTMENT_INIT',
    GET_STATIONBYDEPARTMENT_SUCCESS: 'GET_STATIONBYDEPARTMENT_SUCCESS',
    GET_STATIONBYDEPARTMENT_ERROR: 'GET_STATIONBYDEPARTMENT_ERROR',

    REMOVE_SELECTEDSTATION: 'REMOVE_SELECTEDSTATION',
    REMOVE_FILTEREDSTATION: 'REMOVE_FILTEREDSTATION',

    DELETE_MODAL_OPEN: 'DELETE_MODAL_OPEN',
    DELETE_MODAL_CLOSE: 'DELETE_MODAL_CLOSE',

    CREATE_STATION_INIT: 'CREATE_STATION_INIT',
    CREATE_STATION_SUCCESS: 'CREATE_STATION_SUCCESS',
    CREATE_STATION_ERROR: 'CREATE_STATION_ERROR',

    EDIT_STATION_INIT: 'EDIT_STATION_INIT',
    EDIT_STATION_SUCCESS: 'EDIT_STATION_SUCCESS',
    EDIT_STATION_ERROR: 'EDIT_STATION_ERROR',

    DELETE_STATION_INIT: 'DELETE_STATION_INIT',
    DELETE_STATION_SUCCESS: 'DELETE_STATION_SUCCESS',
    DELETE_STATION_ERROR: 'DELETE_STATION_ERROR',
}

export const GetStationsByUser = (UserID) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_STATIONBYUSER_INIT })
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_URL}/Station/GetStationsByUser`,
        data: UserID,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_STATIONBYUSER_SUCCESS, payload: response.data }) })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_STATIONBYUSER_ERROR, payload: error }) })
}

export const GetStationByDepartments = (Departments) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_STATIONBYDEPARTMENT_INIT })
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_URL}/Station/GetStationsByDepartments`,
        data: Departments,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_STATIONBYDEPARTMENT_SUCCESS, payload: response.data }) })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_STATIONBYDEPARTMENT_ERROR, payload: error }) })
}

export const GetAllStations = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Station/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_SUCCESS, payload: response.data }) })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLSTATIONS_ERROR, payload: error }) })
}

export const GetSelectedStation = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDSTATION_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Station/GetSelectedStation?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDSTATION_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDSTATION_ERROR, payload: error }) })
};

export const CreateStation = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_STATION_INIT })
    await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Station/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_STATION_SUCCESS })
            Popup("Success", "İstasyon Ekleme", "İstasyon Eklendi")
            historypusher.push("/Stations")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_STATION_ERROR, payload: error })
            Popup("Error", "İstasyon Ekleme", "İstasyon Eklenemedi")
        })
}

export const UpdateStation = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_STATION_INIT })
    await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Station/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_STATION_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDSTATION })
            Popup("Success", "İstasyon Güncelleme", "İstasyon Güncellendi")
            historypusher.push("/Stations")
        })
        .catch(error => {
            Popup("Error", "İstasyon Güncelleme", "İstasyon Güncellenemedi")
            dispatch({ type: ACTION_TYPES.EDIT_STATION_ERROR, payload: error })
            switch (error.response.status) {
                case 400:
                    alert("Invalid data")
                    break;
                case 401:
                    alert("Unauthorized")
                    break;
                case 404:
                    alert("Not found")
                    break;
                case 500:
                    alert("Internal server error")
                    break;
                default:
                    alert("Unknown error")
                    break;
            }
        })
}

export const DeleteStation = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_STATION_INIT })
    await axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Station/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_STATION_SUCCESS })
            Popup("Success", "İstasyon Silme", "İstasyon Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_STATION_ERROR, payload: error })
            Popup("Error", "İstasyon Silme", "İstasyon Silinemedi")
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