import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Spinner from '../app/shared/Spinner';
import ProtectedRoute from './Components/Common/ProtectedRoutes';

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Case = lazy(() => import('./Pages/CaseListining'));
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
          <ProtectedRoute exact path="/Case" component={ Case } />
          <Route exact path="/User/login" component={ Login } />       
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