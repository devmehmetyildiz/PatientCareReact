import { ActionTypes } from "../constant/action-type"

const initialState = {
    AllCases: [],
}

export const caseReducer = (state = initialState, {type,payload}) => {

    switch (type) {
        case ActionTypes.SET_CASES:          
            return {...state,AllCases:payload};
        default:
            return state;
    }
}

export const selectedCaseReducer = (state = {}, { type, payload }) => {   
    switch (type) {
      case ActionTypes.SELECTED_CASE:
        return { ...state, ...payload };
        case ActionTypes.REMOVE_SELECTED_CASE:
        return { };      
      default:
        return state;
    }
  };