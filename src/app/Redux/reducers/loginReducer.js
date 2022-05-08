import { ActionTypes } from "../constant/action-type"
import { GetUser } from "../../Utils/TokenValidChecker";
export const loginReducer = (state = "", {type,payload}) => {

    switch (type) {
        case ActionTypes.SET_USER:          
            return {...state,user:GetUser()};
        default:
            return state;
    }
}