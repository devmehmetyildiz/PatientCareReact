import { ActionTypes } from "../constant/action-type"

const initialState = {
    user: {
        username:''
    },
}

export const loginReducer = (state = initialState, {type,payload}) => {

    switch (type) {
        case ActionTypes.SET_USER:
          
            return {...state,user:payload};
        default:
            return state;
    }
}