console.log("marketing app running ...");
import React from "react";
import ReactDOM from "react-dom";

// mount function to start up app
const mount = (el) => {
  ReactDOM.render(<h1>Marketing App</h1>, el);
};

// call mount immediately in development and isolation
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_marketing-dev-root");

  devRoot && mount(devRoot);
}

// export mount function
export { mount };
