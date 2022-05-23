import axios from "axios";
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_CURRENTUSER_INIT: 'GET_CURRENTUSER_INIT',
    GET_CURRENTUSER_SUCCESS: 'GET_CURRENTUSER_SUCCESS',
    GET_CURRENTUSER_ERROR: 'GET_CURRENTUSER_ERROR',
}


export const GetCurrentUser =  () => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_CURRENTUSER_INIT })
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Auth/GetActiveuser',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_CURRENTUSER_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_CURRENTUSER_ERROR, payload: error }) })
};
