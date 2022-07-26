import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./loginReducer";
import { CaseReducer } from "./CaseReducer";
import { roleReducer } from "./RoleReducer";
import { StationReducer } from "./StationReducer";
import { DepartmentReducer } from "./DepartmentReducer";
import { UserReducer } from "./UserReducer";
import { PatientReducer } from "./PatientReducer";
import { PatienttypeReducer } from "./PatienttypeReducer";
import { UnitReducer } from "./UnitReducer";
import { StockReducer } from "./StockReducer";
import { FileReducer } from "./FileReducer";
import { CostumertypeReducer } from "./CostumertypeReducer";
import { ActivestockReducer } from "./Activestock";
const reducers = combineReducers({
    ActiveUser: loginReducer,
    Cases: CaseReducer,
    Roles: roleReducer,
    Stations: StationReducer,
    Departments: DepartmentReducer,
    Users: UserReducer,
    Patients: PatientReducer,
    Patienttypes: PatienttypeReducer,
    Units: UnitReducer,
    Stocks: StockReducer,
    Files: FileReducer,
    Costumertypes: CostumertypeReducer,
    Activestocks: ActivestockReducer
});

export default reducers;