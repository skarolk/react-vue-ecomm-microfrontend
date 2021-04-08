console.log("marketing app running ...");
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// mount function to start up app
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// call mount immediately in development and isolation
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_marketing-dev-root");

  devRoot && mount(devRoot);
}

// export mount function
export { mount };
