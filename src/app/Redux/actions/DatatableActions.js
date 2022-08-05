import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLDATATABLES_INIT: `GET_ALLDATATABLES_INIT`,
    GET_ALLDATATABLES_SUCCESS: `GET_ALLDATATABLES_SUCCESS`,
    GET_ALLDATATABLES_ERROR: `GET_ALLDATATABLES_ERROR`,

    UPDATE_ITEM: 'UPDATE_ITEM',

    CREATE_DATATABLE_INIT: `CREATE_DATATABLE_INIT`,
    CREATE_DATATABLE_SUCCESS: `CREATE_DATATABLE_SUCCESS`,
    CREATE_DATATABLE_ERROR: `CREATE_DATATABLE_ERROR`,

    EDIT_DATATABLE_INIT: `EDIT_DATATABLE_INIT`,
    EDIT_DATATABLE_SUCCESS: `EDIT_DATATABLE_SUCCESS`,
    EDIT_DATATABLE_ERROR: `EDIT_DATATABLE_ERROR`,

    MODAL_OPEN: 'MODAL_OPEN',
    MODAL_CLOSE: 'MODAL_CLOSE'
}

export const GetAllDatatables = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLDATATABLES_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DATATABLE}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_ALLDATATABLES_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLDATATABLES_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.DATATABLE, "GetAll")
        })
}

export const CreateDatatable = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_DATATABLE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DATATABLE}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_DATATABLE_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_DATATABLE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.DATATABLE, "Add")
        })
}

export const UpdateDatatable = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_DATATABLE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DATATABLE}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_DATATABLE_SUCCESS })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_DATATABLE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.DATATABLE, "Update")
        })
}

export const OpenModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.MODAL_OPEN })
}

export const CloseModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.MODAL_CLOSE })
}

export const Updateitem = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.UPDATE_ITEM,payload:Item })
}