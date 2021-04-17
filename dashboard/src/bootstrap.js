console.log("dashboard app is running ...");
import { createApp } from "vue";
import Dashboard from "./components/Dashboard";

// mount function to start up app
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

// call mount immediately in development and isolation
if (process.env.NODE_ENV === "development") {
  const devRoot = document.getElementById("_dashboard-dev-root");

  // empty object fixes error when not passing in onNavigate
  devRoot && mount(devRoot);
}

// export mount function
export { mount };
