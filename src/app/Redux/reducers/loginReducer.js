import { ACTION_TYPES } from "../actions/loginActions"
import Popup from "../../Utils/Popup";

const INITIAL_STATE = {
    user: "",
    message: "",
    isloading: false
};

export const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ACTION_TYPES.GET_CURRENTUSER_INIT:
            return { ...state, user: payload, isloading: true };
        case ACTION_TYPES.GET_CURRENTUSER_SUCCESS:
            return { ...state, user: payload, isloading: false };
        case ACTION_TYPES.GET_CURRENTUSER_ERROR:
            Popup("Error", "Giriş Başarısız", payload.name)
            return { ...state, message: payload, isloading: false };
        default: return state;
    }
}