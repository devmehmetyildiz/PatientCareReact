import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLDEPARTMENTS_INIT: 'GET_ALLDEPARTMENTS_INIT',
    GET_ALLDEPARTMENTS_SUCCESS: 'GET_ALLDEPARTMENTS_SUCCESS',
    GET_ALLDEPARTMENTS_ERROR: 'GET_ALLDEPARTMENTS_ERROR',

    GET_SELECTEDDEPARTMENT_INIT: 'GET_SELECTEDDEPARTMENT_INIT',
    GET_SELECTEDDEPARTMENT_SUCCESS: 'GET_SELECTEDDEPARTMENT_SUCCESS',
    GET_SELECTEDDEPARTMENT_ERROR: 'GET_SELECTEDDEPARTMENT_ERROR',

    REMOVE_SELECTEDDEPARTMENT: 'REMOVE_SELECTEDDEPARTMENT',
    DELETE_MODAL_OPEN: 'DELETE_MODAL_OPEN',
    DELETE_MODAL_CLOSE: 'DELETE_MODAL_CLOSE',

    CREATE_DEPARTMENT_INIT: 'CREATE_DEPARTMENT_INIT',
    CREATE_DEPARTMENT_SUCCESS: 'CREATE_DEPARTMENT_SUCCESS',
    CREATE_DEPARTMENT_ERROR: 'CREATE_DEPARTMENT_ERROR',

    EDIT_DEPARTMENT_INIT: 'EDIT_DEPARTMENT_INIT',
    EDIT_DEPARTMENT_SUCCESS: 'EDIT_DEPARTMENT_SUCCESS',
    EDIT_DEPARTMENT_ERROR: 'EDIT_DEPARTMENT_ERROR',

    DELETE_DEPARTMENT_INIT: 'DELETE_DEPARTMENT_INIT',
    DELETE_DEPARTMENT_SUCCESS: 'DELETE_DEPARTMENT_SUCCESS',
    DELETE_DEPARTMENT_ERROR: 'DELETE_DEPARTMENT_ERROR',
}

export const GetAllDepartments = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTS_INIT })
    await axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Department/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
                response.data.forEach((item, index) => {
                    var text = item.stations.map((item) => {
                        return item.name;
                    }).join(", ")
                    item.stations = text;
                })
            dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTS_SUCCESS, payload: response.data })
        })
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTS_ERROR, payload: error }) })
}

export const GetSelectedDepartment = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDDEPARTMENT_INIT })
    await axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL}/Department/GetSelectedDepartment?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDDEPARTMENT_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDDEPARTMENT_ERROR, payload: error }) })
};

export const CreateDepartment = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_DEPARTMENT_INIT })
    await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Department/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_DEPARTMENT_SUCCESS })
            historypusher.push("/Departments")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_DEPARTMENT_ERROR, payload: error })
        })
}

export const UpdateDepartment = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_INIT })
    await axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Department/Update',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDDEPARTMENT })
            historypusher.push("/Departments")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_ERROR, payload: error })
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

export const DeleteDepartment = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_INIT })
    await axios({
        method: 'delete',
        url: process.env.REACT_APP_BACKEND_URL + '/Department/Delete',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_ERROR, payload: error })
        })
}

export const ClearSelectedDepartment = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDDEPARTMENT })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}