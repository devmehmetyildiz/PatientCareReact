import { combineReducers } from "@reduxjs/toolkit";
import {loginReducer} from "./loginReducer";
import { caseReducer } from "./caseReducer";

const reducers = combineReducers({
    user : loginReducer,
    cases : caseReducer,
});

export default reducers;