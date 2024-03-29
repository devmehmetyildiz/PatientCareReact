import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import Popup from "../../Utils/Popup";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLPATIENTS_INIT: `GET_ALLPATIENTS_INIT`,
    GET_ALLPATIENTS_SUCCESS: `GET_ALLPATIENTS_SUCCESS`,
    GET_ALLPATIENTS_ERROR: `GET_ALLPATIENTS_ERROR`,

    GET_SELECTEDPATIENT_INIT: `GET_SELECTEDPATIENT_INIT`,
    GET_SELECTEDPATIENT_SUCCESS: `GET_SELECTEDPATIENT_SUCCESS`,
    GET_SELECTEDPATIENT_ERROR: `GET_SELECTEDPATIENT_ERROR`,

    REMOVE_SELECTEDPATIENT: `REMOVE_SELECTEDPATIENT`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_PATIENT_INIT: `CREATE_PATIENT_INIT`,
    CREATE_PATIENT_SUCCESS: `CREATE_PATIENT_SUCCESS`,
    CREATE_PATIENT_ERROR: `CREATE_PATIENT_ERROR`,

    EDIT_PATIENT_INIT: `EDIT_PATIENT_INIT`,
    EDIT_PATIENT_SUCCESS: `EDIT_PATIENT_SUCCESS`,
    EDIT_PATIENT_ERROR: `EDIT_PATIENT_ERROR`,

    DELETE_PATIENT_INIT: `DELETE_PATIENT_INIT`,
    DELETE_PATIENT_SUCCESS: `DELETE_PATIENT_SUCCESS`,
    DELETE_PATIENT_ERROR: `DELETE_PATIENT_ERROR`,
}

export const GetAllPatients = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLPATIENTS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENT}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                item.patienttypetxt = item.patienttype.name;
            })
            dispatch({ type: ACTION_TYPES.GET_ALLPATIENTS_SUCCESS, payload: response.data })
        })
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_ALLPATIENTS_ERROR, payload: error }) 
            AxiosErrorHandle(error,ROUTES.PATIENT,"GetAll")
        })
}

export const GetSelectedPatient = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDPATIENT_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PATIENT}/GetSelectedPatient?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDPATIENT_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDPATIENT_ERROR, payload: error }) })
};

export const CreatePatient = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_PATIENT_INIT })
    await axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENT}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_PATIENT_SUCCESS })
            Popup("Success","Tanımlı Hastalar","Hasta Oluşturuldu")
            historypusher.push("/Patients")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_PATIENT_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.PATIENT,"Add")
        })
}

export const UpdatePatient = (Item, historypusher) => async dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_PATIENT_INIT })
    await axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENT}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_PATIENT_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPATIENT })
            Popup("Success","Tanımlı Hastalar","Hasta Bilgileri Güncellendi")
            historypusher.push("/Patients")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_PATIENT_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.PATIENT,"Update")
        })
}

export const DeletePatient = (Item) => async dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_PATIENT_INIT })
    await axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PATIENT}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_PATIENT_SUCCESS })
            Popup("Success","Tanımlı Hastalar","Hasta Bilgileri Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_PATIENT_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.PATIENT,"Delete")
        })
}

export const ClearSelectedPatient = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPATIENT })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}