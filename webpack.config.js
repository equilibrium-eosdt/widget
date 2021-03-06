const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
  entry: {
    inject: "./src/inject.ts",
    injectScatter: "./src/inject-scatter.ts",
  },
  devtool: argv && argv.mode === "production" ? false : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HTMLPlugin({
      template: "example/simple.html",
      inject: false,
    }),
    new HTMLPlugin({
      filename: "scatter.html",
      template: "example/scatter.html",
      inject: false,
    }),
    new HTMLPlugin({
      filename: "example-iframe.html",
      template: "example/iframe.html",
      inject: false,
    }),
    new HTMLPlugin({
      filename: "iframe.html",
      template: "src/iframe.html",
      inject: false,
    }), // TODO separate CDN content and examples
  ],
});
