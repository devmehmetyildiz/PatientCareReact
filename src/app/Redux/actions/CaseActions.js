import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup";

export const ACTION_TYPES = {
    GET_ALLCASES_INIT: `GET_ALLCASES_INIT`,
    GET_ALLCASES_SUCCESS: `GET_ALLCASES_SUCCESS`,
    GET_ALLCASES_ERROR: `GET_ALLCASES_ERROR`,

    GET_SELECTEDCASE_INIT: `GET_SELECTEDCASE_INIT`,
    GET_SELECTEDCASE_SUCCESS: `GET_SELECTEDCASE_SUCCESS`,
    GET_SELECTEDCASE_ERROR: `GET_SELECTEDCASE_ERROR`,

    REMOVE_SELECTEDCASE: `REMOVE_SELECTEDCASE`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_CASE_INIT: `CREATE_CASE_INIT`,
    CREATE_CASE_SUCCESS: `CREATE_CASE_SUCCESS`,
    CREATE_CASE_ERROR: `CREATE_CASE_ERROR`,

    EDIT_CASE_INIT: `EDIT_CASE_INIT`,
    EDIT_CASE_SUCCESS: `EDIT_CASE_SUCCESS`,
    EDIT_CASE_ERROR: `EDIT_CASE_ERROR`,

    DELETE_CASE_INIT: `DELETE_CASE_INIT`,
    DELETE_CASE_SUCCESS: `DELETE_CASE_SUCCESS`,
    DELETE_CASE_ERROR: `DELETE_CASE_ERROR`,
}

export const GetAllCases = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLCASES_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CASE}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                var text = item.departments.map((item) => {
                    return item.name;
                }).join(", ")
                item.departmentstxt = text;
            })
            dispatch({ type: ACTION_TYPES.GET_ALLCASES_SUCCESS, payload: response.data }) 
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLCASES_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CASE, "GetAll")
        })
}

export const GetSelectedCase = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.CASE}/GetSelectedCase?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_SUCCESS, payload: response.data }))
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_ERROR, payload: error }) 
            AxiosErrorHandle(error, ROUTES.CASE, "GetSelectedCase")
        })
};

export const CreateCase = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_CASE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CASE}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_CASE_SUCCESS })
            Popup("Success","Durumlar","Durum Oluşturuldu")
            historypusher.push("/Cases")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_CASE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CASE, "Add")
        })
}

export const UpdateCase = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_CASE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CASE}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_CASE_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCASE })
            Popup("Success","Durumlar","Durum Güncellendi")
            historypusher.push("/Cases")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_CASE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CASE, "Update")
        })
}

export const DeleteCase = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_CASE_INIT })
    axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CASE}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_CASE_SUCCESS })
            Popup("Success","Durumlar","Durum Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_CASE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CASE, "Delete")
        })
}

export const ClearSelectedCase = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCASE })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}