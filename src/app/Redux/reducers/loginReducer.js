import { ActionTypes } from "../constant/action-type"

export const loginReducer = (state = {}, {type,payload}) => {

    switch (type) {
        case ActionTypes.SET_USER:          
            return {...state,user:payload};
        default:
            return state;
    }
}