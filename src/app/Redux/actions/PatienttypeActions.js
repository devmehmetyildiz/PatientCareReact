import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLPATIENTTYPES_INIT: 'GET_ALLPATIENTTYPES_INIT',
    GET_ALLPATIENTTYPES_SUCCESS: 'GET_ALLPATIENTTYPES_SUCCESS',
    GET_ALLPATIENTTYPES_ERROR: 'GET_ALLPATIENTTYPES_ERROR',

    GET_SELECTEDPATIENTTYPE_INIT: 'GET_SELECTEDPATIENTTYPE_INIT',
    GET_SELECTEDPATIENTTYPE_SUCCESS: 'GET_SELECTEDPATIENTTYPE_SUCCESS',
    GET_SELECTEDPATIENTTYPE_ERROR: 'GET_SELECTEDPATIENTTYPE_ERROR',

    REMOVE_SELECTEDPATIENTTYPE: 'REMOVE_SELECTEDPATIENTTYPE',
    DELETE_MODAL_OPEN: 'DELETE_MODAL_OPEN',
    DELETE_MODAL_CLOSE: 'DELETE_MODAL_CLOSE',

    CREATE_PATIENTTYPE_INIT: 'CREATE_PATIENTTYPE_INIT',
    CREATE_PATIENTTYPE_SUCCESS: 'CREATE_PATIENTTYPE_SUCCESS',
    CREATE_PATIENTTYPE_ERROR: 'CREATE_PATIENTTYPE_ERROR',

    EDIT_PATIENTTYPE_INIT: 'EDIT_PATIENTTYPE_INIT',
    EDIT_PATIENTTYPE_SUCCESS: 'EDIT_PATIENTTYPE_SUCCESS',
    EDIT_PATIENTTYPE_ERROR: 'EDIT_PATIENTTYPE_ERROR',

    DELETE_PATIENTTYPE_INIT: 'DELETE_PATIENTTYPE_INIT',
    DELETE_PATIENTTYPE_SUCCESS: 'DELETE_PATIENTTYPE_SUCCESS',
    DELETE_PATIENTTYPE_ERROR: 'DELETE_PATIENTTYPE_ERROR',
}

export const GetAllPatienttype = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLPATIENTTYPES_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Patienttype/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response =>
            dispatch({ type: ACTION_TYPES.GET_ALLPATIENTTYPES_SUCCESS, payload: response.data })
        )
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLPATIENTTYPES_ERROR, payload: error }) })
}

export const GetSelectedPatienttype = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDPATIENTTYPE_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Patienttype/GetSelectedPatienttype?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDPATIENTTYPE_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDPATIENTTYPE_ERROR, payload: error }) })
};

export const CreatePatienttype = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_PATIENTTYPE_INIT })
    await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Patienttype/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_PATIENTTYPE_SUCCESS })
            historypusher.push("/Patienttypes")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_PATIENTTYPE_ERROR, payload: error })
        })
}

export const UpdatePatienttype = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_PATIENTTYPE_INIT })
    await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Patienttype/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_PATIENTTYPE_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPATIENTTYPE })
            historypusher.push("/Patienttypes")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_PATIENTTYPE_ERROR, payload: error })
        })
}

export const DeletePatienttype = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_PATIENTTYPE_INIT })
    await axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Patienttype/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_PATIENTTYPE_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_PATIENTTYPE_ERROR, payload: error })
        })
}

export const ClearSelectedPatienttype = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPATIENTTYPE })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}