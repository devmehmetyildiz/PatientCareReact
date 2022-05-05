import { combineReducers } from "@reduxjs/toolkit";
import {loginReducer} from "./loginReducer";
import { caseReducer,selectedcaseReducer } from "./caseReducer";

const reducers = combineReducers({
    ActiveUser : loginReducer,
    AllCases : caseReducer,
    SelectedCase : selectedcaseReducer,
});

export default reducers;