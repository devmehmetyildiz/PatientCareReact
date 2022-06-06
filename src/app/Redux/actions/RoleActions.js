import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ROLES_INIT: "GET_ROLES_INIT",
    GET_ROLES_SUCCESS: "GET_ROLES_SUCCESS",
    GET_ROLES_ERROR: "GET_ROLES_ERROR",

    GET_AUTHORY_INIT: "GET_AUTHORY_INIT",
    GET_AUTHORY_SUCCESS: "GET_AUTHORY_SUCCESS",
    GET_AUTHORY_ERROR: "GET_AUTHORY_ERROR",

    GET_SELECTEDROLE_INIT: "GET_SELECTEDROLE_INIT",
    GET_SELECTEDROLE_SUCCESS: "GET_SELECTEDROLE_SUCCESS",
    GET_SELECTEDROLE_ERROR: "GET_SELECTEDROLE_ERROR",

    REMOVE_SELECTEDROLE: "REMOVE_SELECTEDROLE",

    EDIT_ROLE_INIT: "EDIT_ROLE_INIT",
    EDIT_ROLE_SUCCESS: "EDIT_ROLE_SUCCESS",
    EDIT_ROLE_ERROR: "EDIT_ROLE_ERROR",

    ADD_ROLE_INIT: "ADD_ROLE_INIT",
    ADD_ROLE_SUCCESS: "ADD_ROLE_SUCCESS",
    ADD_ROLE_ERROR: "ADD_ROLE_ERROR",

    DELETE_ROLE_INIT: "DELETE_ROLE_INIT",
    DELETE_ROLE_SUCCESS: "DELETE_ROLE_SUCCESS",
    DELETE_ROLE_ERROR: "DELETE_ROLE_ERROR",

    DELETE_MODAL_OPEN: "DELETE_MODAL_OPEN",
    DELETE_MODAL_CLOSE: "DELETE_MODAL_CLOSE"
}

export const GetAuthories = () => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_AUTHORY_INIT });
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Roles/GetAllAuthories',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_AUTHORY_SUCCESS, payload: response.data }) })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_AUTHORY_ERROR, payload: error }) })
}

export const GetAllRoles = () => async dispatch => {

    dispatch({ type: ACTION_TYPES.GET_ROLES_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Roles/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                var text = item.authories.map((item) => {
                    return item.name;
                }).join(", ")
                item.authories = text;
            })
            dispatch({ type: ACTION_TYPES.GET_ROLES_SUCCESS, payload: response.data })

        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ROLES_ERROR, payload: error }) })
}

export const GetSelectedRole = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDROLE_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Roles/GetSelectedRole?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDROLE_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDROLE_ERROR, payload: error }) })
};

export const CreateRole = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.ADD_ROLE_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Roles/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.ADD_ROLE_SUCCESS })
            historypusher.push("/Roles")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.ADD_ROLE_ERROR, payload: error })
        })
}

export const UpdateRole = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_ROLE_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Roles/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_ROLE_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDROLE })
            historypusher.push("/Roles")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_ROLE_ERROR, payload: error })
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

export const DeleteRole = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_ROLE_INIT })
    await axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Roles/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_ROLE_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_ROLE_ERROR, payload: error })
        })
}

export const ClearSelectedRole = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDROLE })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}

