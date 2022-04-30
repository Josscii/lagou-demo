import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import base from "./webpack.base.config";

const devServer: DevServerConfiguration = {
  historyApiFallback: true,
  port: 5000,
  hot: true,
};

const config: Configuration = {
  mode: "development",
  devServer: devServer,
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

export default merge(base, config);
