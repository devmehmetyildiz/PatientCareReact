import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLACTIVESTOCKS_INIT: 'GET_ALLACTIVESTOCKS_INIT',
    GET_ALLACTIVESTOCKS_SUCCESS: 'GET_ALLACTIVESTOCKS_SUCCESS',
    GET_ALLACTIVESTOCKS_ERROR: 'GET_ALLACTIVESTOCKS_ERROR',

    GET_SELECTEDACTIVESTOCK_INIT: 'GET_SELECTEDACTIVESTOCK_INIT',
    GET_SELECTEDACTIVESTOCK_SUCCESS: 'GET_SELECTEDACTIVESTOCK_SUCCESS',
    GET_SELECTEDACTIVESTOCK_ERROR: 'GET_SELECTEDACTIVESTOCK_ERROR',

    REMOVE_SELECTEDACTIVESTOCK: 'REMOVE_SELECTEDACTIVESTOCK',
    DELETE_MODAL_OPEN: 'DELETE_MODAL_OPEN',
    DELETE_MODAL_CLOSE: 'DELETE_MODAL_CLOSE',

    CREATESTOCK_MODAL_OPEN: 'CREATESTOCK_MODAL_OPEN',
    CREATESTOCK_MODAL_CLOSE: 'CREATESTOCK_MODAL_CLOSE',

    CREATE_ACTIVESTOCK_INIT: 'CREATE_ACTIVESTOCK_INIT',
    CREATE_ACTIVESTOCK_SUCCESS: 'CREATE_ACTIVESTOCK_SUCCESS',
    CREATE_ACTIVESTOCK_ERROR: 'CREATE_ACTIVESTOCK_ERROR',

    EDIT_ACTIVESTOCK_INIT: 'EDIT_ACTIVESTOCK_INIT',
    EDIT_ACTIVESTOCK_SUCCESS: 'EDIT_ACTIVESTOCK_SUCCESS',
    EDIT_ACTIVESTOCK_ERROR: 'EDIT_ACTIVESTOCK_ERROR',

    DELETE_ACTIVESTOCK_INIT: 'DELETE_ACTIVESTOCK_INIT',
    DELETE_ACTIVESTOCK_SUCCESS: 'DELETE_ACTIVESTOCK_SUCCESS',
    DELETE_ACTIVESTOCK_ERROR: 'DELETE_ACTIVESTOCK_ERROR',

    UPDATE_DETAILS: "UPDATE_DETAILS",
    UPDATE_DEPARTMENT: "UPDATE_DEPARTMENT"
}

export const GetAllActivestocks = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLACTIVESTOCKS_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Activestock/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            console.log(' response.data: ', response.data);
            response.data.forEach(element => {
                element.stockname = element.stock.name
                element.departmentname = element.department.name
            })
            dispatch({ type: ACTION_TYPES.GET_ALLACTIVESTOCKS_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLACTIVESTOCKS_ERROR, payload: error }) })
}

export const GetSelectedActivestock = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDACTIVESTOCK_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Activestock/GetSelectedActivestock?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.stockname = response.data.stock.name
            response.data.departmentname = response.data.department.name
            dispatch({ type: ACTION_TYPES.GET_SELECTEDACTIVESTOCK_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDACTIVESTOCK_ERROR, payload: error }) })
};

export const CreateActivestock = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_ACTIVESTOCK_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Activestock/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_ACTIVESTOCK_SUCCESS })
            historypusher.push("/Activestocks")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_ACTIVESTOCK_ERROR, payload: error })
        })
}

export const CreateActivestocks = (Item, historypusher) => dispatch => {
    console.log('Item: ', Item);
    dispatch({ type: ACTION_TYPES.CREATE_ACTIVESTOCK_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Activestock/AddRange',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_ACTIVESTOCK_SUCCESS })
            historypusher.push("/Activestocks")
        })
        .catch(error => {
            console.log('error: ', error);
            dispatch({ type: ACTION_TYPES.CREATE_ACTIVESTOCK_ERROR, payload: error })
        })
}

export const UpdateActivestock = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_ACTIVESTOCK_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Activestock/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_ACTIVESTOCK_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDACTIVESTOCK })
            historypusher.push("/Activestocks")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_ACTIVESTOCK_ERROR, payload: error })
        })
}

export const DeleteActivestock = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_ACTIVESTOCK_INIT })
    axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Activestock/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_ACTIVESTOCK_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_ACTIVESTOCK_ERROR, payload: error })
        })
}

export const ClearSelectedActivestock = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDACTIVESTOCK })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}

export const OpenStockModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATESTOCK_MODAL_OPEN })
}

export const CloseStockModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATESTOCK_MODAL_CLOSE })
}

export const UpdateDetails = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_DETAILS, payload: Item })
}

export const UpdateDepartment = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_DEPARTMENT, payload: Item })
}