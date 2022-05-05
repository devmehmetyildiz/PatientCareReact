import { ActionTypes } from "../constant/action-type"

export const setCases = (caseitems) => {
    return {
        type : ActionTypes.SET_CASES,
        payload : caseitems,
    };
};

export const selectedCase = (caseitem) => {
    return {
        type : ActionTypes.SELECTED_CASE,
        payload : caseitem,
    };
};

export const removeselectedCase = () => {
    return {
        type : ActionTypes.REMOVE_SELECTED_CASE        
    };
};