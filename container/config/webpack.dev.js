const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // host doesn't require name, but convention dictates to assign name anyways
      name: "container",
      remotes: {
        // name before @ must match ModuleFederationPlugin's name key value for incoming app
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      // array useful when you want to be specific about what packages you want to have shared
      // shared: ["react", "react-dom"]
      // you can share package.json dependencies as object
      // DO NOT share dev dependencies
      shared: packageJson.dependencies,
    }),
  ],
};

// second argument takes precedence over first argument
module.exports = merge(commonConfig, devConfig);
