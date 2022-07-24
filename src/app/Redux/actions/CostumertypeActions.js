import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup";

export const ACTION_TYPES = {
    GET_ALLCOSTUMERTYPES_INIT: `GET_ALLCOSTUMERTYPES_INIT`,
    GET_ALLCOSTUMERTYPES_SUCCESS: `GET_ALLCOSTUMERTYPES_SUCCESS`,
    GET_ALLCOSTUMERTYPES_ERROR: `GET_ALLCOSTUMERTYPES_ERROR`,

    GET_SELECTEDCOSTUMERTYPE_INIT: `GET_SELECTEDCOSTUMERTYPE_INIT`,
    GET_SELECTEDCOSTUMERTYPE_SUCCESS: `GET_SELECTEDCOSTUMERTYPE_SUCCESS`,
    GET_SELECTEDCOSTUMERTYPE_ERROR: `GET_SELECTEDCOSTUMERTYPE_ERROR`,

    REMOVE_SELECTEDCOSTUMERTYPE: `REMOVE_SELECTEDCOSTUMERTYPE`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_COSTUMERTYPE_INIT: `CREATE_COSTUMERTYPE_INIT`,
    CREATE_COSTUMERTYPE_SUCCESS: `CREATE_COSTUMERTYPE_SUCCESS`,
    CREATE_COSTUMERTYPE_ERROR: `CREATE_COSTUMERTYPE_ERROR`,

    EDIT_COSTUMERTYPE_INIT: `EDIT_COSTUMERTYPE_INIT`,
    EDIT_COSTUMERTYPE_SUCCESS: `EDIT_COSTUMERTYPE_SUCCESS`,
    EDIT_COSTUMERTYPE_ERROR: `EDIT_COSTUMERTYPE_ERROR`,

    DELETE_COSTUMERTYPE_INIT: `DELETE_COSTUMERTYPE_INIT`,
    DELETE_COSTUMERTYPE_SUCCESS: `DELETE_COSTUMERTYPE_SUCCESS`,
    DELETE_COSTUMERTYPE_ERROR: `DELETE_COSTUMERTYPE_ERROR`,
}

export const GetAllCostumertypes = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLCOSTUMERTYPES_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COSTUMERTYPE}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                var text = item.departments.map((item) => {
                    return item.name;
                }).join(", ")
                item.departmentstxt = text;
            })
            dispatch({ type: ACTION_TYPES.GET_ALLCOSTUMERTYPES_SUCCESS, payload: response.data }) 
        })
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_ALLCOSTUMERTYPES_ERROR, payload: error }) 
            AxiosErrorHandle(error,ROUTES.COSTUMERTYPE,"GetAll")
        })
}

export const GetSelectedCostumertype = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDCOSTUMERTYPE_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.COSTUMERTYPE}/GetSelectedCostumertype?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDCOSTUMERTYPE_SUCCESS, payload: response.data }))
        .catch(error => { 
            dispatch({ type: ACTION_TYPES.GET_SELECTEDCOSTUMERTYPE_ERROR, payload: error }) 
            AxiosErrorHandle(error,ROUTES.COSTUMERTYPE,"GetSelectedCostumertype")
        })
};

export const CreateCostumertype = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_COSTUMERTYPE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COSTUMERTYPE}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_COSTUMERTYPE_SUCCESS })
            Popup("Success","Müşteri Türü","Müşteri Türü Oluşturuldu")
            historypusher.push("/Costumertypes")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_COSTUMERTYPE_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.COSTUMERTYPE,"Add")
        })
}

export const UpdateCostumertype = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_COSTUMERTYPE_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COSTUMERTYPE}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_COSTUMERTYPE_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCOSTUMERTYPE })
            Popup("Success","Müşteri Türü","Müşteri Türü Güncellendi")
            historypusher.push("/Costumertypes")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_COSTUMERTYPE_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.COSTUMERTYPE,"Update")
        })
}

export const DeleteCostumertype = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_COSTUMERTYPE_INIT })
    axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COSTUMERTYPE}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_COSTUMERTYPE_SUCCESS })
            Popup("Success","Müşteri Türü","Müşteri Türü Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_COSTUMERTYPE_ERROR, payload: error })
            AxiosErrorHandle(error,ROUTES.COSTUMERTYPE,"Delete")
        })
}

export const ClearSelectedCostumertype = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCOSTUMERTYPE })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}