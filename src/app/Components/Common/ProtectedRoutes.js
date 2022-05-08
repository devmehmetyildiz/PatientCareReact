import React from "react";
import { Route, Redirect } from "react-router-dom";
import {TokenValidChecker} from "../../Utils/TokenValidChecker";

const ProtectedRoute = ({ authrole, component: Component, ...rest }) => {

  var isauth = TokenValidChecker();
  
  return (
    <Route
      {...rest}
      render={(props) => {      
        if (isauth) return <Component {...props} />;
        if (!isauth)
          return (
            <Redirect to={{ pathname: "/Login", state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;
