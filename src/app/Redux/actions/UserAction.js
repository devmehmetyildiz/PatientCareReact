import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLUSERS_INIT: 'GET_ALLUSERS_INIT',
    GET_ALLUSERS_SUCCESS: 'GET_ALLUSERS_SUCCESS',
    GET_ALLUSERS_ERROR: 'GET_ALLUSERS_ERROR',

    GET_SELECTEDUSER_INIT: 'GET_SELECTEDUSER_INIT',
    GET_SELECTEDUSER_SUCCESS: 'GET_SELECTEDUSER_SUCCESS',
    GET_SELECTEDUSER_ERROR: 'GET_SELECTEDUSER_ERROR',

    REMOVE_SELECTEDUSER: 'REMOVE_SELECTEDUSER',
    DELETE_MODAL_OPEN: 'DELETE_MODAL_OPEN',
    DELETE_MODAL_CLOSE: 'DELETE_MODAL_CLOSE',

    CREATE_USER_INIT: 'CREATE_USER_INIT',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_ERROR: 'CREATE_USER_ERROR',

    EDIT_USER_INIT: 'EDIT_USER_INIT',
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_ERROR: 'EDIT_USER_ERROR',

    DELETE_USER_INIT: 'DELETE_USER_INIT',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_ERROR: 'DELETE_USER_ERROR',
}

export const GetAllUsers = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLUSERS_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Users/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                var text = item.stations.map((item) => {
                    return item.name;
                }).join(", ")
                item.stations = text;
            })
            response.data.forEach((item, index) => {
                var text = item.departments.map((item) => {
                    return item.name;
                }).join(", ")
                item.departments = text;
            })
            response.data.forEach((item, index) => {
                var text = item.roles.map((item) => {
                    return item.name;
                }).join(", ")
                item.roles = text;
            })
            dispatch({ type: ACTION_TYPES.GET_ALLUSERS_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLUSERS_ERROR, payload: error }) })
}

export const GetSelectedUser = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDUSER_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Users/GetSelectedUser?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDUSER_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDUSER_ERROR, payload: error }) })
}

export const DeleteUser = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_USER_INIT })
    await axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Users/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_USER_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_USER_ERROR, payload: error })
        })
}

export const CreateUser = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_USER_INIT })
    await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Users/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_USER_SUCCESS })
            historypusher.push("/Users")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_USER_ERROR, payload: error })
        })
}

export const EditUser = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_USER_INIT })
    await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Users/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_USER_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDUSER })
            historypusher.push("/Users")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_USER_ERROR, payload: error })
        })
}

export const ClearSelectedUser = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDUSER })
}

export const OpenDeleteModal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}