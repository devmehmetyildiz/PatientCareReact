import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import Popup from "../../Utils/Popup";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLFILES_INIT: `GET_ALLFILES_INIT`,
    GET_ALLFILES_SUCCESS: `GET_ALLFILES_SUCCESS`,
    GET_ALLFILES_ERROR: `GET_ALLFILES_ERROR`,

    GET_SELECTEDFILE_INIT: `GET_SELECTEDFILE_INIT`,
    GET_SELECTEDFILE_SUCCESS: `GET_SELECTEDFILE_SUCCESS`,
    GET_SELECTEDFILE_ERROR: `GET_SELECTEDFILE_ERROR`,

    REMOVE_SELECTEDFILE: `REMOVE_SELECTEDFILE`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_FILE_INIT: `CREATE_FILE_INIT`,
    CREATE_FILE_SUCCESS: `CREATE_FILE_SUCCESS`,
    CREATE_FILE_ERROR: `CREATE_FILE_ERROR`,

    EDIT_FILE_INIT: `EDIT_FILE_INIT`,
    EDIT_FILE_SUCCESS: `EDIT_FILE_SUCCESS`,
    EDIT_FILE_ERROR: `EDIT_FILE_ERROR`,

    DELETE_FILE_INIT: `DELETE_FILE_INIT`,
    DELETE_FILE_SUCCESS: `DELETE_FILE_SUCCESS`,
    DELETE_FILE_ERROR: `DELETE_FILE_ERROR`,
}

export const GetAllFiles = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLFILES_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => { dispatch({ type: ACTION_TYPES.GET_ALLFILES_SUCCESS, payload: response.data }) }
        )
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLFILES_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.FILE, "GetAll")
        })
}

export const GetSelectedFile = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDFILE_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.FILE}/GetSelectedFile?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDFILE_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDFILE_ERROR, payload: error }) })
};

export const GetSelectedFileByPatient = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDFILE_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.FILE}/GetSelectedFileByPatientGuid?Guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDFILE_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDFILE_ERROR, payload: error }) })
};

export const CreateFile = (Item, historypusher,filename) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_FILE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
    .then(() => {
            console.log('Item: ', Item);
            dispatch({ type: ACTION_TYPES.CREATE_FILE_SUCCESS })
            Popup("Success", "Dosyalar", `Dosya Yüklendi : ${filename}`)
            historypusher.push("/Files")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_FILE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.FILE, "Add")
        })
}

export const UpdateFile = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_FILE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_FILE_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDFILE })
            Popup("Success", "Dosyalar", "Dosya Güncellendi")
            historypusher.push("/Files")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_FILE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.FILE, "Update")
        })
}

export const DeleteFile = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_FILE_INIT })
    axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_FILE_SUCCESS })
            Popup("Success", "Dosyalar", "Dosya Silindi")
            dispatch({ type: ACTION_TYPES.GET_ALLFILES_INIT })
            axios({
                method: `get`,
                url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/GetAll`,
                headers: { Authorization: `Bearer ${GetToken()}` }
            })
                .then(response => { dispatch({ type: ACTION_TYPES.GET_ALLFILES_SUCCESS, payload: response.data }) }
                )
                .catch(error => {
                    dispatch({ type: ACTION_TYPES.GET_ALLFILES_ERROR, payload: error })
                    AxiosErrorHandle(error, ROUTES.FILE, "GetAll")
                })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_FILE_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.FILE, "Delete")
        })
}



export const ClearSelectedFile = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDFILE })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDFILE })
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}