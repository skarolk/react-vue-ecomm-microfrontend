import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Signin from "./components/Signin";
import Signup from "./components/Signup";

// instead of generating "jss" class names, will prepend with productionPrefix
const generateClassname = createGenerateClassName({
  productionPrefix: "auth",
});

export default ({ history, onSignIn }) => {
  return (
    <StylesProvider generateClassName={generateClassname}>
      <Router history={history}>
        <Switch>
          <Route path={"/auth/signin"}>
            <Signin onSignIn={onSignIn} />
          </Route>
          <Route path={"/auth/signup"}>
            <Signup onSignIn={onSignIn} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  );
};
