import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_DEACTIVESTOCKS_INIT: `GET_DEACTIVESTOCKS_INIT`,
    GET_DEACTIVESTOCKS_SUCCESS: `GET_DEACTIVESTOCKS_SUCCESS`,
    GET_DEACTIVESTOCKS_ERROR: `GET_DEACTIVESTOCKS_ERROR`,
}

export const GetAllDeactivestocks = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_DEACTIVESTOCKS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.DEACTIVESTOCK}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
               item.stockname = item.activestock.stock.name
               item.departmentname = item.activestock.department.name
            })
            dispatch({ type: ACTION_TYPES.GET_DEACTIVESTOCKS_SUCCESS, payload: response.data }) 
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_DEACTIVESTOCKS_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.DEACTIVESTOCK, "GetAll")
        })
}
