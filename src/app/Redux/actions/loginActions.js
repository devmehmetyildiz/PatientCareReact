import axios from "axios";
import { GetToken } from "../../Utils/TokenValidChecker";
import Cookies from 'universal-cookie';


export const ACTION_TYPES = {
    GET_CURRENTUSER_INIT: 'GET_CURRENTUSER_INIT',
    GET_CURRENTUSER_SUCCESS: 'GET_CURRENTUSER_SUCCESS',
    GET_CURRENTUSER_ERROR: 'GET_CURRENTUSER_ERROR',

    LOGIN_INIT: 'LOGIN_INIT',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',

    LOGOUT_INIT: 'LOGOUT_INIT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR'
}


export const GetCurrentUser = () => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_CURRENTUSER_INIT })
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Auth/GetActiveuser',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_CURRENTUSER_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_CURRENTUSER_ERROR, payload: error }) })
};

export const SetLogin = (logindata, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.LOGIN_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Auth/Login',
        data: logindata
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.LOGIN_SUCCESS, payload: response.data })
            const cookies = new Cookies();
            cookies.set('X-Access-Token', response.data.token, { path: '/' });
            cookies.set('X-Username', response.data.user, { path: '/' });
            historypusher.push("/Dashboard")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.LOGIN_ERROR, payload: error })
        })
}

export const SetLogout = (historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.LOGOUT_INIT })
    try {
        console.log("1")
        const cookies = new Cookies();
        cookies.remove('X-Access-Token')
        cookies.remove('X-Username')
        console.log("2")
        dispatch({ type: ACTION_TYPES.LOGOUT_SUCCESS})
        console.log("3")
        historypusher.push("/Login")
        console.log("4")
    } catch (error) {
        dispatch({ type: ACTION_TYPES.LOGOUT_ERROR })
    }


}


