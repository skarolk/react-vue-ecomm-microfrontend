console.log("marketing app is running ...");
import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

// mount function to start up app
const mount = (el, { onNavigate, defaultHistory }) => {
  // if defaultHistory is received, will be used for local routing
  const history = defaultHistory || createMemoryHistory();
  onNavigate && history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      pathname !== nextPathname && history.push(nextPathname);
    },
  };
};

// call mount immediately in development and isolation
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_marketing-dev-root");

  // empty object fixes error when not passing in onNavigate
  devRoot && mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// export mount function
export { mount };
