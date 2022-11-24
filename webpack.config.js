const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");

const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: "./app/index.tsx",
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.t(s|sx)?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2015",
        },
      },
    ],
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api": "http://localhost:8080",
      changeOrigin: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "speedtest",
      template: "./static/index-template.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "all",
          test: /node_modules/,
          priority: 20,
        },
      },
    },
  },
};
