import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from '../app/shared/Spinner';
import ProtectedRoute from './Components/Common/ProtectedRoutes';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Roles = lazy(() => import('./Pages/Roles'));
const RolesCreate = lazy(() => import('./Pages/Roles/Create'));
const RolesEdit = lazy(() => import('./Pages/Roles/Edit'));

const Cases = lazy(() => import('./Pages/Cases'));
const CasesCreate = lazy(() => import('./Pages/Cases/Create'));
const CasesEdit = lazy(() => import('./Pages/Cases/Edit'));

const Users = lazy(() => import('./Pages/Users'));
const UsersCreate = lazy(() => import('./Pages/Users/Create'));
const UsersEdit = lazy(() => import('./Pages/Users/Edit'));

const Departments = lazy(() => import('./Pages/Departments'));
const DepartmentsCreate = lazy(() => import('./Pages/Departments/Create'));
const DepartmentsEdit = lazy(() => import('./Pages/Departments/Edit'));

const Stations = lazy(() => import('./Pages/Stations'));
const StationsCreate = lazy(() => import('./Pages/Stations/Create'));
const StationsEdit = lazy(() => import('./Pages/Stations/Edit'));

const Files = lazy(() => import('./Pages/Files'));
const FilesCreate = lazy(() => import('./Pages/Files/Create'));
const FilesEdit = lazy(() => import('./Pages/Files/Edit'));

const Patients = lazy(() => import('./Pages/Patients'));
const PatientsCreate = lazy(() => import('./Pages/Patients/Create'));
const PatientsEdit = lazy(() => import('./Pages/Patients/Edit'));

const Patienttypes = lazy(() => import('./Pages/Patienttypes'));
const PatienttypesCreate = lazy(() => import('./Pages/Patienttypes/Create'));
const PatienttypesEdit = lazy(() => import('./Pages/Patienttypes/Edit'));

const Stocks = lazy(() => import('./Pages/Stocks'));
const StocksCreate = lazy(() => import('./Pages/Stocks/Create'));
const StocksEdit = lazy(() => import('./Pages/Stocks/Edit'));

const Units = lazy(() => import('./Pages/Units'));
const UnitsCreate = lazy(() => import('./Pages/Units/Create'));
const UnitsEdit = lazy(() => import('./Pages/Units/Edit'));

const Costumertypes = lazy(() => import('./Pages/Costumertypes'));
const CostumertypesCreate = lazy(() => import('./Pages/Costumertypes/Create'));
const CostumertypesEdit = lazy(() => import('./Pages/Costumertypes/Edit'));

const ActiveStocks = lazy(() => import('./Pages/ActiveStocks'));
const ActiveStocksCreate = lazy(() => import('./Pages/ActiveStocks/Create'));
const ActiveStocksEdit = lazy(() => import('./Pages/ActiveStocks/Edit'));

const Stockmovements = lazy(() => import('./Pages/Stockmovements'));
const Stockmovement = lazy(() => import('./Pages/Stockmovements/stockmovement'));

const Deactivestocks = lazy(() => import('./Pages/Deactivestocks'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));
const Login = lazy(() => import('./User/Login'));
const Register = lazy(() => import('./User/Register'));
const Lockscreen = lazy(() => import('./User/Lockscreen'));

class AppRoutes extends Component {
  render () {
    return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
          <ProtectedRoute exact path="/dashboard" component={ Dashboard } />

          <ProtectedRoute exact path="/Roles" component={ Roles } />
          <ProtectedRoute exact path="/Roles/Create" component={ RolesCreate } />
          <ProtectedRoute exact path="/Roles/:RoleId" component={ RolesEdit } />

          <ProtectedRoute exact path="/Cases" component={ Cases } />
          <ProtectedRoute exact path="/Cases/Create" component={ CasesCreate } />
          <ProtectedRoute exact path="/Cases/:CaseId" component={ CasesEdit } />

          <ProtectedRoute exact path="/Departments" component={ Departments } />
          <ProtectedRoute exact path="/Departments/Create" component={ DepartmentsCreate } />
          <ProtectedRoute exact path="/Departments/:DepartmentId" component={ DepartmentsEdit } />
          
          <ProtectedRoute exact path="/Stations" component={ Stations } />
          <ProtectedRoute exact path="/Stations/Create" component={ StationsCreate } />
          <ProtectedRoute exact path="/Stations/:StationId" component={ StationsEdit } />

          <ProtectedRoute exact path="/Users" component={ Users } />
          <ProtectedRoute exact path="/Users/Create" component={ UsersCreate } />
          <ProtectedRoute exact path="/Users/:UserId" component={ UsersEdit } />

          <ProtectedRoute exact path="/Files" component={ Files } />
          <ProtectedRoute exact path="/Files/Create" component={ FilesCreate } />
          <ProtectedRoute exact path="/Files/:FileId" component={ FilesEdit } />

          <ProtectedRoute exact path="/Patients" component={ Patients } />
          <ProtectedRoute exact path="/Patients/Create" component={ PatientsCreate } />
          <ProtectedRoute exact path="/Patients/:PatientId" component={ PatientsEdit } />

          <ProtectedRoute exact path="/Patienttypes" component={ Patienttypes } />
          <ProtectedRoute exact path="/Patienttypes/Create" component={ PatienttypesCreate } />
          <ProtectedRoute exact path="/Patienttypes/:PatienttypeId" component={ PatienttypesEdit } />

          <ProtectedRoute exact path="/Stocks" component={ Stocks } />
          <ProtectedRoute exact path="/Stocks/Create" component={ StocksCreate } />
          <ProtectedRoute exact path="/Stocks/:StockId" component={ StocksEdit } />

          <ProtectedRoute exact path="/Units" component={ Units } />
          <ProtectedRoute exact path="/Units/Create" component={ UnitsCreate } />
          <ProtectedRoute exact path="/Units/:UnitId" component={ UnitsEdit } />

          <ProtectedRoute exact path="/Costumertypes" component={ Costumertypes } />
          <ProtectedRoute exact path="/Costumertypes/Create" component={CostumertypesCreate } />
          <ProtectedRoute exact path="/Costumertypes/:CostumertypeId" component={ CostumertypesEdit } />

          <ProtectedRoute exact path="/Users" component={ Users } />
          <ProtectedRoute exact path="/Users/Create" component={ UsersCreate } />
          <ProtectedRoute exact path="/Users/:UserId" component={ UsersEdit } />

          <ProtectedRoute exact path="/ActiveStocks" component={ ActiveStocks } />
          <ProtectedRoute exact path="/ActiveStocks/Create/:DepartmentId" component={ ActiveStocksCreate } />
          <ProtectedRoute exact path="/ActiveStocks/:ActivestockId" component={ ActiveStocksEdit } />

          <ProtectedRoute exact path="/Deactivestocks" component={ Deactivestocks } />
        
          <ProtectedRoute exact path="/Stockmovements" component={ Stockmovements } />
          <ProtectedRoute exact path="/Stockmovement/:StockGuid" component={ Stockmovement } />

          <Route exact path="/Login" component={ Login } />       
          <Route exact path="/User/Register" component={ Register } />
          <Route exact path="/User/lockscreen" component={ Lockscreen } />
          <Route exact path="/error-pages/error-404" component={ Error404 } />
          <Route exact path="/error-pages/error-500" component={ Error500 } />
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;