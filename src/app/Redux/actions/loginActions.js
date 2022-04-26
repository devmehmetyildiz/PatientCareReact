import { ActionTypes } from "../constant/action-type"

export const setUser = (user) => {
    return {
        type : ActionTypes.SET_USER,
        payload : user,
    };
};