import { ACTION_TYPES } from "../actions/loginActions"
import Popup from "../../Utils/Popup";

const INITIAL_STATE = {
    user: "",
    message: "",
    isloading: false,
    redirect: false
};

export const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_CURRENTUSER_INIT:
            return { ...state, user: payload, isloading: true };
        case ACTION_TYPES.GET_CURRENTUSER_SUCCESS:
            return { ...state, user: payload, isloading: false };
        case ACTION_TYPES.GET_CURRENTUSER_ERROR:
            Popup("Error", "Kullanıcı Adı Çekilemedi", payload.name)
            return { ...state, message: payload, isloading: false };
        case ACTION_TYPES.LOGIN_INIT:
            return { ...state, user: payload, isloading: true };
        case ACTION_TYPES.LOGIN_SUCCESS:
            return { ...state, isloading: false, redirect: true };
        case ACTION_TYPES.LOGIN_ERROR:
            return { ...state, message: payload, isloading: false, redirect: false };
        case ACTION_TYPES.LOGOUT_INIT:
            return { ...state, user: payload, isloading: true };
        case ACTION_TYPES.LOGOUT_SUCCESS:
            return { ...state, state:INITIAL_STATE };
        case ACTION_TYPES.LOGOUT_ERROR:
            return { ...state, isloading: false };
        default: return state;
    }
}