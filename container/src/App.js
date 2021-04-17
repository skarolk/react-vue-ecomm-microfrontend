import React, { lazy, Suspense, useState, useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
// for lazy loading, don't need to important components right away
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

const LazyMarketing = lazy(() => import("./components/MarketingApp"));
const LazyAuth = lazy(() => import("./components/AuthApp"));
const LazyDashboard = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "container",
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSignIn = () => {
    console.log("user signed in ...");
    setIsSignedIn(true);
  };

  const onSignOut = () => {
    console.log("user logged out ...");
    setIsSignedIn(false);
  };

  useEffect(() => {
    isSignedIn && history.push("/dashboard");
  }, [isSignedIn]);

  return (
    //  BrowserRouter creates copy of Browser History
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
        <Suspense fallback={<ProgressBar />}>
          <Switch>
            <Route path="/auth">
              <LazyAuth onSignIn={onSignIn} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <LazyDashboard onSignIn={onSignIn} />
            </Route>
            <Route path="/" component={LazyMarketing} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};
