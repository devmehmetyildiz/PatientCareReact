import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_AUTHORIES_INIT: "GET_AUTHORIES_INIT",
    GET_AUTHORIES_SUCCESS: "GET_AUTHORIES_SUCCESS",
    GET_AUTHORIES_ERROR: "GET_AUTHORIES_ERROR",

    GET_ROLES_INIT: "GET_ROLES_INIT",
    GET_ROLES_SUCCESS: "GET_ROLES_SUCCESS",
    GET_ROLES_ERROR: "GET_ROLES_ERROR",

    GET_SELECTEDAUTHORY_INIT: "GET_SELECTEDAUTHORY_INIT",
    GET_SELECTEDAUTHORY_SUCCESS: "GET_SELECTEDAUTHORY_SUCCESS",
    GET_SELECTEDAUTHORY_ERROR: "GET_SELECTEDAUTHORY_ERROR",

    REMOVE_SELECTEDAUTHORY: "REMOVE_SELECTEDAUTHORY",

    EDIT_AUTHORY_INIT: "EDIT_AUTHORY_INIT",
    EDIT_AUTHORY_SUCCESS: "EDIT_AUTHORY_SUCCESS",
    EDIT_AUTHORY_ERROR: "EDIT_AUTHORY_ERROR",

    ADD_AUTHORY_INIT: "ADD_AUTHORY_INIT",
    ADD_AUTHORY_SUCCESS: "ADD_AUTHORY_SUCCESS",
    ADD_AUTHORY_ERROR: "ADD_AUTHORY_ERROR",

    DELETE_AUTHORY_INIT: "DELETE_AUTHORY_INIT",
    DELETE_AUTHORY_SUCCESS: "DELETE_AUTHORY_SUCCESS",
    DELETE_AUTHORY_ERROR: "DELETE_AUTHORY_ERROR",

    DELETE_MODAL_OPEN: "DELETE_MODAL_OPEN",
    DELETE_MODAL_CLOSE: "DELETE_MODAL_CLOSE"
}

export const GetRoles = () => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ROLES_INIT });
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Authory/GetAllroles',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_ROLES_SUCCESS, payload: response.data }) })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ROLES_ERROR, payload: error }) })
}

export const GetAllAuthories = () => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_AUTHORIES_INIT })
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Authory/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                var text = item.roles.map((item) => {
                    return item.name;
                }).join(", ")
                item.roles = text;
            })
            dispatch({ type: ACTION_TYPES.GET_AUTHORIES_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_AUTHORIES_ERROR, payload: error }) })
}

export const GetSelectedAuthory = (ItemId) => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDAUTHORY_INIT })
    axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Authory/GetSelectedAuthory?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDAUTHORY_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDAUTHORY_ERROR, payload: error }) })
};

export const CreateAuthory = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.ADD_AUTHORY_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Authory/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.ADD_AUTHORY_SUCCESS })
            historypusher.push("/Roles")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.ADD_AUTHORY_ERROR, payload: error })
        })
}

export const UpdateAuthory = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_AUTHORY_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Authory/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_AUTHORY_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDAUTHORY })
            historypusher.push("/Authory")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_AUTHORY_ERROR, payload: error })
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

export const DeleteAuthory = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_AUTHORY_INIT })
    axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Authory/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_AUTHORY_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_AUTHORY_ERROR, payload: error })
        })
}

export const ClearSelectedAuthory = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDAUTHORY })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}

