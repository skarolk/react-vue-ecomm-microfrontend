import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
// for lazy loading, don't need to important components right away
// import MarketingApp from "./components/MarketingApp";
// import AuthApp from "./components/AuthApp";

const LazyMarketing = lazy(() => import("./components/MarketingApp"));
const LazyAuth = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "container",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onSignIn = () => {
    console.log("signing in user ...");
    setIsSignedIn(true);
  };

  const onSignOut = () => {
    console.log("user logged out ...");
    setIsSignedIn(false);
  };

  return (
    //  BrowserRouter creates copy of Browser History
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header isSignedIn={isSignedIn} onSignOut={onSignOut} />
        <Suspense fallback={<ProgressBar />}>
          <Switch>
            <Route path="/auth">
              <LazyAuth onSignIn={onSignIn} />
            </Route>
            <Route path="/">
              <LazyMarketing />
            </Route>
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};
