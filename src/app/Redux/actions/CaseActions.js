import axios from "axios"
import { GetToken } from "../../Utils/TokenValidChecker";

export const ACTION_TYPES = {
    GET_ALLCASES_INIT: 'GET_ALLCASES_INIT',
    GET_ALLCASES_SUCCESS: 'GET_ALLCASES_SUCCESS',
    GET_ALLCASES_ERROR: 'GET_ALLCASES_ERROR',

    GET_SELECTEDCASE_INIT: 'GET_SELECTEDCASE_INIT',
    GET_SELECTEDCASE_SUCCESS: 'GET_SELECTEDCASE_SUCCESS',
    GET_SELECTEDCASE_ERROR: 'GET_SELECTEDCASE_ERROR',

    REMOVE_SELECTEDCASE: 'REMOVE_SELECTEDCASE',

    CREATE_CASE_INIT: 'CREATE_CASE_INIT',
    CREATE_CASE_SUCCESS: 'CREATE_CASE_SUCCESS',
    CREATE_CASE_ERROR: 'CREATE_CASE_ERROR',

    EDIT_CASE_INIT: 'EDIT_CASE_INIT',
    EDIT_CASE_SUCCESS: 'EDIT_CASE_SUCCESS',
    EDIT_CASE_ERROR: 'EDIT_CASE_ERROR',
}

export const GetAllCases = () => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLCASES_INIT })
    axios({
        method: 'get',
        url: process.env.REACT_APP_BACKEND_URL + '/Case/GetAll',
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_ALLCASES_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_ALLCASES_ERROR, payload: error }) })
}

export const GetSelectedCase = (ItemId) => dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_INIT })
    axios({
        method: 'get',
        url: `${process.env.REACT_APP_BACKEND_URL} + /Case/GetSelectedCase?ID=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_SUCCESS, payload: response.data }))
        .catch(error => { dispatch({ type: ACTION_TYPES.GET_SELECTEDCASE_ERROR, payload: error }) })
};

export const CreateCase = (Item,historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_CASE_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Case/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_CASE_SUCCESS})
            historypusher.push("/Dashboard")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_CASE_ERROR, payload: error })
        })
}

export const UpdateCase = (Item,historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_CASE_INIT })
    axios({
        method: 'post',
        url: process.env.REACT_APP_BACKEND_URL + '/Case/Add',
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_CASE_SUCCESS})
            historypusher.push("/Dashboard")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_CASE_ERROR, payload: error })
        })
}
