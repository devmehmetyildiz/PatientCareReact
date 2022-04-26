import { combineReducers } from "@reduxjs/toolkit";
import {loginReducer} from "./loginReducer";

const reducers = combineReducers({
    user : loginReducer
});

export default reducers;