import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./loginReducer";
import { caseReducer } from "./caseReducer";
import { roleReducer } from "./RoleReducer";
import { StationReducer } from "./StationReducer";
import { DepartmentReducer } from "./DepartmentReducer";
import { UserReducer } from "./UserReducer";

const reducers = combineReducers({
    ActiveUser: loginReducer,
    Cases: caseReducer,
    Roles: roleReducer,
    Stations : StationReducer,
    Departments : DepartmentReducer,
    Users : UserReducer
});

export default reducers;