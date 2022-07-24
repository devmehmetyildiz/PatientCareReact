import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import Popup from "../../Utils/Popup";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";

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
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ROLE}/GetAllAuthories`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_AUTHORY_SUCCESS, payload: response.data }) })
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_AUTHORY_ERROR, payload: error }) 
            AxiosErrorHandle(error,ROUTES.ROLE,"GetAllAuthories")
        })
}

export const GetAllRoles = () => async dispatch => {

    dispatch({ type: ACTION_TYPES.GET_ROLES_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ROLE}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                var text = item.authories.map((item) => {
                    return item.name;
                }).join(", ")
                item.authoriestxt = text;
            })
            dispatch({ type: ACTION_TYPES.GET_ROLES_SUCCESS, payload: response.data })

        })
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_ROLES_ERROR, payload: error }) 
            AxiosErrorHandle(error,ROUTES.ROLE,"GetAll")
        })
}

export const GetSelectedRole = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDROLE_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.ROLE}/GetSelectedRole?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDROLE_SUCCESS, payload: response.data }))
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_SELECTEDROLE_ERROR, payload: error }) 
            AxiosErrorHandle(error,ROUTES.ROLE,"GetSelectedRole")
        })
};

export const CreateRole = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.ADD_ROLE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ROLE}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.ADD_ROLE_SUCCESS })
            Popup("Success","Roller","Rol Oluşturuldu")
            historypusher.push("/Roles")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.ADD_ROLE_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.ROLE,"Add")
        })
}

export const UpdateRole = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_ROLE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ROLE}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_ROLE_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDROLE })
            Popup("Success","Roller","Rol Güncellendi")
            historypusher.push("/Roles")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_ROLE_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.ROLE,"Update")
        })
}

export const DeleteRole = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_ROLE_INIT })
    await axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.ROLE}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_ROLE_SUCCESS })
            Popup("Success","Roller","Rol Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_ROLE_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.ROLE,"Delete")
        })
}

export const ClearSelectedRole = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDROLE })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDROLE })
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}

