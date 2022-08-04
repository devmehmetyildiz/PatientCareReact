import axios from "axios"
import { ROUTES, MOVEMENTTYPES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_STOCKMOVEMENTS_INIT: `GET_STOCKMOVEMENTS_INIT`,
    GET_STOCKMOVEMENTS_SUCCESS: `GET_STOCKMOVEMENTS_SUCCESS`,
    GET_STOCKMOVEMENTS_ERROR: `GET_STOCKMOVEMENTS_ERROR`,
}

export const GetAllStockmovements = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENTS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.STOCKMOVEMENT}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            response.data.forEach((item, index) => {
                item.stockname = item.activestock.stock.name
                item.departmentname = item.activestock.department.name
                item.movementtypename = (MOVEMENTTYPES.find(item => item.value === item.movementype)).label
            })
            dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENTS_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_STOCKMOVEMENTS_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.STOCKMOVEMENT, "GetAll")
        })
}
