import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./loginReducer";
import { caseReducer } from "./caseReducer";
import { authoryReducer } from "./AuthoryReducer";

const reducers = combineReducers({
    ActiveUser: loginReducer,
    Cases: caseReducer,
    Authories: authoryReducer
});

export default reducers;