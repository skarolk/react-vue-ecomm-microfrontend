import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

import Landing from "./components/Landing";
import Pricing from "./components/Pricing";

// instead of generating "jss" class names, will prepend with productionPrefix
const generateClassname = createGenerateClassName({
  productionPrefix: "marketing",
});

export default ({ history }) => {
  return (
    <StylesProvider generateClassName={generateClassname}>
      <Router history={history}>
        <Switch>
          <Route exact path="/pricing" component={Pricing} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </StylesProvider>
  );
};
