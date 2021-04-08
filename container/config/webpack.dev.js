const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
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
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

// second argument takes precedence over first argument
module.exports = merge(commonConfig, devConfig);
