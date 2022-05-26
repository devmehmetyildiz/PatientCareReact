import { combineReducers } from "@reduxjs/toolkit";
import {loginReducer} from "./loginReducer";
import { caseReducer,selectedcaseReducer } from "./caseReducer";

const reducers = combineReducers({
    ActiveUser : loginReducer,
    Cases : caseReducer
});

export default reducers;