const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    // loaders - process files
    rules: [
      {
        // process any file that ends in mjs or js
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  // loads index.html
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
