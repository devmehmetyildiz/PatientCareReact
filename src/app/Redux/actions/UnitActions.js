import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLUNITS_INIT: 'GET_ALLUNITS_INIT',
    GET_ALLUNITS_SUCCESS: 'GET_ALLUNITS_SUCCESS',
    GET_ALLUNITS_ERROR: 'GET_ALLUNITS_ERROR',

    GET_SELECTEDUNIT_INIT: 'GET_SELECTEDUNIT_INIT',
    GET_SELECTEDUNIT_SUCCESS: 'GET_SELECTEDUNIT_SUCCESS',
    GET_SELECTEDUNIT_ERROR: 'GET_SELECTEDUNIT_ERROR',

    REMOVE_SELECTEDUNIT: 'REMOVE_SELECTEDUNIT',
    DELETE_MODAL_OPEN: 'DELETE_MODAL_OPEN',
    DELETE_MODAL_CLOSE: 'DELETE_MODAL_CLOSE',

    CREATE_UNIT_INIT: 'CREATE_UNIT_INIT',
    CREATE_UNIT_SUCCESS: 'CREATE_UNIT_SUCCESS',
    CREATE_UNIT_ERROR: 'CREATE_UNIT_ERROR',

    EDIT_UNIT_INIT: 'EDIT_UNIT_INIT',
    EDIT_UNIT_SUCCESS: 'EDIT_UNIT_SUCCESS',
    EDIT_UNIT_ERROR: 'EDIT_UNIT_ERROR',

    DELETE_UNIT_INIT: 'DELETE_UNIT_INIT',
    DELETE_UNIT_SUCCESS: 'DELETE_UNIT_SUCCESS',
    DELETE_UNIT_ERROR: 'DELETE_UNIT_ERROR',
}

export const GetAllUnits = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLUNITS_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Unit/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                console.log('item: ', item);
                var text = item.departments.map((item) => {
                    return item.name;
                }).join(", ")
                item.departmentstxt = text;
            })
            { dispatch({ type: ACTION_TYPES.GET_ALLUNITS_SUCCESS, payload: response.data }) }
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLUNITS_ERROR, payload: error }) })
}

export const GetSelectedUnit = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDUNIT_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Unit/GetSelectedUnit?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDUNIT_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDUNIT_ERROR, payload: error }) })
};

export const CreateUnit = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_UNIT_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Unit/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_UNIT_SUCCESS })
            historypusher.push("/Units")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_UNIT_ERROR, payload: error })
        })
}

export const UpdateUnit = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_UNIT_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Unit/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_UNIT_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDUNIT })
            historypusher.push("/Units")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_UNIT_ERROR, payload: error })
        })
}

export const DeleteUnit = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_UNIT_INIT })
    axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Unit/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_UNIT_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_UNIT_ERROR, payload: error })
        })
}

export const ClearSelectedUnit = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDUNIT })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}