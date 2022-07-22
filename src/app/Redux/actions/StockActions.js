import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLSTOCKS_INIT: 'GET_ALLSTOCKS_INIT',
    GET_ALLSTOCKS_SUCCESS: 'GET_ALLSTOCKS_SUCCESS',
    GET_ALLSTOCKS_ERROR: 'GET_ALLSTOCKS_ERROR',

    GET_SELECTEDSTOCK_INIT: 'GET_SELECTEDSTOCK_INIT',
    GET_SELECTEDSTOCK_SUCCESS: 'GET_SELECTEDSTOCK_SUCCESS',
    GET_SELECTEDSTOCK_ERROR: 'GET_SELECTEDSTOCK_ERROR',

    REMOVE_SELECTEDSTOCK: 'REMOVE_SELECTEDSTOCK',
    DELETE_MODAL_OPEN: 'DELETE_MODAL_OPEN',
    DELETE_MODAL_CLOSE: 'DELETE_MODAL_CLOSE',

    CREATE_STOCK_INIT: 'CREATE_STOCK_INIT',
    CREATE_STOCK_SUCCESS: 'CREATE_STOCK_SUCCESS',
    CREATE_STOCK_ERROR: 'CREATE_STOCK_ERROR',

    EDIT_STOCK_INIT: 'EDIT_STOCK_INIT',
    EDIT_STOCK_SUCCESS: 'EDIT_STOCK_SUCCESS',
    EDIT_STOCK_ERROR: 'EDIT_STOCK_ERROR',

    DELETE_STOCK_INIT: 'DELETE_STOCK_INIT',
    DELETE_STOCK_SUCCESS: 'DELETE_STOCK_SUCCESS',
    DELETE_STOCK_ERROR: 'DELETE_STOCK_ERROR',
}

export const GetAllStocks = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLSTOCKS_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Stock/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => 
            { dispatch({ type: ACTION_TYPES.GET_ALLSTOCKS_SUCCESS, payload: response.data }) }
        )
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLSTOCKS_ERROR, payload: error }) })
}

export const GetSelectedStock = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDSTOCK_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Stock/GetSelectedStock?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDSTOCK_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDSTOCK_ERROR, payload: error }) })
};

export const CreateStock = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_STOCK_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Stock/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_STOCK_SUCCESS })
            historypusher.push("/Stocks")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_STOCK_ERROR, payload: error })
        })
}

export const UpdateStock = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_STOCK_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Stock/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_STOCK_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDSTOCK })
            historypusher.push("/Stocks")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_STOCK_ERROR, payload: error })
        })
}

export const DeleteStock = (Item) =>async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_STOCK_INIT })
    axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Stock/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_STOCK_SUCCESS })
            dispatch({ type: ACTION_TYPES.GET_ALLSTOCKS_INIT })
            axios({
                method: 'get',
                url: process.env.REACT_APP_BACKEND_URL + '/Stock/GetAll',
                headers: { Authorization: `Bearer ${GetToken()}` }
            })
                .then(response => 
                    { dispatch({ type: ACTION_TYPES.GET_ALLSTOCKS_SUCCESS, payload: response.data }) }
                )
                .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLSTOCKS_ERROR, payload: error }) })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_STOCK_ERROR, payload: error })
        })
}

export const ClearSelectedStock = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDSTOCK })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}