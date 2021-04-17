console.log("auth app is running ...");
import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// mount function to start up app
const mount = (el, { onNavigate, onSignIn, defaultHistory, initialPath }) => {
  // if defaultHistory is received, will be used for local routing
  // to avoid history defaulting to "/", pass in path
  const history =
    defaultHistory ||
    createMemoryHistory({
      // set initial path for history
      initialEntries: [initialPath],
    });
  onNavigate && history.listen(onNavigate);

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      pathname !== nextPathname && history.push(nextPathname);
    },
  };
};

// call mount immediately in development and isolation
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_auth-dev-root");

  // empty object fixes error when not passing in onNavigate
  devRoot && mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// export mount function
export { mount };
