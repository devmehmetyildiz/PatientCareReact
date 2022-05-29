import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLCASES_INIT: 'GET_ALLCASES_INIT',
    GET_ALLCASES_SUCCESS: 'GET_ALLCASES_SUCCESS',
    GET_ALLCASES_ERROR: 'GET_ALLCASES_ERROR',

    GET_SELECTEDCASE_INIT: 'GET_SELECTEDCASE_INIT',
    GET_SELECTEDCASE_SUCCESS: 'GET_SELECTEDCASE_SUCCESS',
    GET_SELECTEDCASE_ERROR: 'GET_SELECTEDCASE_ERROR',

    REMOVE_SELECTEDCASE: 'REMOVE_SELECTEDCASE',
    DELETE_MODAL_OPEN: 'DELETE_MODAL_OPEN',
    DELETE_MODAL_CLOSE: 'DELETE_MODAL_CLOSE',

    CREATE_CASE_INIT: 'CREATE_CASE_INIT',
    CREATE_CASE_SUCCESS: 'CREATE_CASE_SUCCESS',
    CREATE_CASE_ERROR: 'CREATE_CASE_ERROR',

    EDIT_CASE_INIT: 'EDIT_CASE_INIT',
    EDIT_CASE_SUCCESS: 'EDIT_CASE_SUCCESS',
    EDIT_CASE_ERROR: 'EDIT_CASE_ERROR',

    DELETE_CASE_INIT: 'DELETE_CASE_INIT',
    DELETE_CASE_SUCCESS: 'DELETE_CASE_SUCCESS',
    DELETE_CASE_ERROR: 'DELETE_CASE_ERROR',
}

export const GetAllCases = () => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLCASES_INIT })
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Case/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_ALLCASES_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLCASES_ERROR, payload: error }) })
}

export const GetSelectedCase = (ItemId) => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_INIT })
    axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Case/GetSelectedCase?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_ERROR, payload: error }) })
};

export const CreateCase = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_CASE_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Case/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_CASE_SUCCESS })
            historypusher.push("/Cases")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_CASE_ERROR, payload: error })
        })
}

export const UpdateCase = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_CASE_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Case/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_CASE_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCASE })
            historypusher.push("/Cases")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_CASE_ERROR, payload: error })
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

export const DeleteCase = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_CASE_INIT })
    axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Case/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_CASE_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_CASE_ERROR, payload: error })
        })
}

export const ClearSelectedCase = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCASE })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}