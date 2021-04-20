import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { either, isEmpty, isNil } from "ramda";

import { initializeLogger } from "../common/logger";
// import { setAuthHeaders, registerIntercepts } from "apis/axios";
// import { PageLoader } from "neetoui";
import Home from "./Dashboard/index";

import PrivateRoute from "./Common/PrivateRoute";
import PasswordReset from "./Authentication/ResetPassword";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
// import Signup from "components/Authentication/Signup";
import Hero from "./Home/Hero";

import { useAuthState, useAuthDispatch } from "../contexts/auth";
import { useUserDispatch } from "../contexts/user";
import { setAuthHeaders, registerIntercepts } from "../apis/axios";

const Main = props => {
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuthState();
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  useEffect(() => {
    userDispatch({ type: "SET_USER", payload: { user: props.user } });
    initializeLogger();
    registerIntercepts(authDispatch);
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    console.log(isLoggedIn)
    return (
      <div className="h-screen">
        {/* <PageLoader /> */}
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Switch>
        <Route exact path="/my/password/new" component={PasswordReset} />
        <Route exact path="/signup" component={Signup} />
        {!isLoggedIn && <Route exact path="/" component={Hero} />}
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Home}
        />
        {/* <Redirect to="/" component={Hero} /> */}
      </Switch>
    </BrowserRouter>
  );
};

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;
