const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8083/",
  },
  devServer: {
    port: 8083,
    historyApiFallback: true,
    // historyApiFallback: {
    //   index: "/index.html",
    // },
    headers: {
      // allows us to load up fonts without CORS errors
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // used to declare global variable for app code in container
      name: "dashboard",
      // whatever filename you want to use here is fine
      filename: "remoteEntry.js",
      exposes: {
        // container will as for Marketing file which will provide bootstrap contents
        "./DashboardApp": "./src/bootstrap",
      },
      // array useful when you want to be specific about what packages you want to have shared
      // shared: ["react", "react-dom"]
      // you can share package.json dependencies as object
      // DO NOT share dev dependencies
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

// second argument takes precedence over first argument
module.exports = merge(commonConfig, devConfig);
