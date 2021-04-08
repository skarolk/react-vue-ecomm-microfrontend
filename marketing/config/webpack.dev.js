const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      // used to declare global variable for app code in container
      name: "marketing",
      // whatever filename you want to use here is fine
      filename: "remoteEntry.js",
      exposes: {
        // container will as for Marketing file which will provide bootstrap contents
        "./MarketingApp": "./src/bootstrap",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

// second argument takes precedence over first argument
module.exports = merge(commonConfig, devConfig);
