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
          <ProtectedRoute exact path="/Users/:StationId" component={ UsersEdit } />

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