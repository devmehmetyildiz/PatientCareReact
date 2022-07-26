import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import Popup from "../../Utils/Popup";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLDEPARTMENTS_INIT: `GET_ALLDEPARTMENTS_INIT`,
    GET_ALLDEPARTMENTS_SUCCESS: `GET_ALLDEPARTMENTS_SUCCESS`,
    GET_ALLDEPARTMENTS_ERROR: `GET_ALLDEPARTMENTS_ERROR`,

    GET_ALLDEPARTMENTSSETTINGS_INIT: `GET_ALLDEPARTMENTSSETTINGS_INIT`,
    GET_ALLDEPARTMENTSSETTINGS_SUCCESS: `GET_ALLDEPARTMENTSSETTINGS_SUCCESS`,
    GET_ALLDEPARTMENTSSETTINGS_ERROR: `GET_ALLDEPARTMENTSSETTINGS_ERROR`,

    GET_SELECTEDDEPARTMENT_INIT: `GET_SELECTEDDEPARTMENT_INIT`,
    GET_SELECTEDDEPARTMENT_SUCCESS: `GET_SELECTEDDEPARTMENT_SUCCESS`,
    GET_SELECTEDDEPARTMENT_ERROR: `GET_SELECTEDDEPARTMENT_ERROR`,

    REMOVE_SELECTEDDEPARTMENT: `REMOVE_SELECTEDDEPARTMENT`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_DEPARTMENT_INIT: `CREATE_DEPARTMENT_INIT`,
    CREATE_DEPARTMENT_SUCCESS: `CREATE_DEPARTMENT_SUCCESS`,
    CREATE_DEPARTMENT_ERROR: `CREATE_DEPARTMENT_ERROR`,

    EDIT_DEPARTMENT_INIT: `EDIT_DEPARTMENT_INIT`,
    EDIT_DEPARTMENT_SUCCESS: `EDIT_DEPARTMENT_SUCCESS`,
    EDIT_DEPARTMENT_ERROR: `EDIT_DEPARTMENT_ERROR`,

    DELETE_DEPARTMENT_INIT: `DELETE_DEPARTMENT_INIT`,
    DELETE_DEPARTMENT_SUCCESS: `DELETE_DEPARTMENT_SUCCESS`,
    DELETE_DEPARTMENT_ERROR: `DELETE_DEPARTMENT_ERROR`,
}

export const GetAllDepartments = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DEPARTMENT}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                var text = item.stations.map((item) => {
                    return item.name;
                }).join(", ")
                item.stationstxt = text;
            })
            dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTS_SUCCESS, payload: response.data })
        })
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTS_ERROR, payload: error }) 
            AxiosErrorHandle(error,ROUTES.DEPARTMENT,"GetAll")
        })
}

export const GetAllDepartmentsSettings = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTSSETTINGS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DEPARTMENT}/GetAllSettings`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                var text = item.stations.map((item) => {
                    return item.name;
                }).join(", ")
                item.stationstxt = text;
            })
            dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTSSETTINGS_SUCCESS, payload: response.data })
        })
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_ALLDEPARTMENTSSETTINGS_ERROR, payload: error }) 
            AxiosErrorHandle(error,ROUTES.DEPARTMENT,"GetAllSettings")
        })
}

export const GetSelectedDepartment = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDDEPARTMENT_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.DEPARTMENT}/GetSelectedDepartment?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDDEPARTMENT_SUCCESS, payload: response.data }))
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_SELECTEDDEPARTMENT_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.DEPARTMENT,"GetSelectedDepartment")
        })
};

export const CreateDepartment = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_DEPARTMENT_INIT })
    await axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DEPARTMENT}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_DEPARTMENT_SUCCESS })
            Popup("Success","Departman","Departman Oluşturuldu")
            historypusher.push("/Departments")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_DEPARTMENT_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.DEPARTMENT,"Add")
        })
}

export const UpdateDepartment = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_INIT })
    await axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DEPARTMENT}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDDEPARTMENT })
            Popup("Success","Departman","Departman Güncellendi")
            historypusher.push("/Departments")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_DEPARTMENT_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.DEPARTMENT,"Update")
        })
}

export const DeleteDepartment = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_INIT })
    await axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DEPARTMENT}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_SUCCESS })
            Popup("Success","Departman","Departman Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_DEPARTMENT_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.DEPARTMENT,"Delete")
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