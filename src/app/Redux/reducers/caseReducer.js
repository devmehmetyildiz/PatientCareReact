import { ActionTypes } from "../constant/action-type"

export const caseReducer = (state = { Data:[]}, {type,payload}) => {

    switch (type) {
        case ActionTypes.SET_CASES:          
            return {...state,AllCases:payload};
        default:
            return state;
    }
}

export const selectedcaseReducer = (state = {}, { type, payload }) => {   
    switch (type) {
      case ActionTypes.SELECTED_CASE:
        return { ...state, ...payload };
        case ActionTypes.REMOVE_SELECTED_CASE:
        return { };      
      default:
        return state;
    }
  };