require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const outputDirectory = process.env.BUILD_OUTPUT;

// all the lovely plugins
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const NodePolyFillPlugin = require("node-polyfill-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let config = {
  output: {
    path: path.resolve(__dirname, outputDirectory),
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [path.join(__dirname, "src"), "node_modules"],
    alias: {
      react: path.join(__dirname, "node_modules", "react"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "singletonStyleTag" },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
          outputPath: "/fonts/",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
        SECURE: JSON.stringify(process.env.SECURE),
        MAX_CHARACTERS_PER_PERSON: JSON.stringify(
          process.env.MAX_CHARACTERS_PER_PERSON
        ),
      },
    }),
    new MiniCssExtractPlugin({
      filename: "./src/client/styles.css",
      chunkFilename: "styles.css",
    }),
    new HtmlWebPackPlugin({
      template: `./public/index.html`,
      favicon: `./public/favicon.ico`,
      inject: true,
    }),
    new NodePolyFillPlugin(),
  ],
};

module.exports = (env, argv) => {
  config.mode = argv.mode;
  if (argv.mode == "development") {
    config.cache = false;
    config.entry = ["babel-polyfill", "./src/client"];
    config.devtool = "inline-source-map";
    config.devServer = {
      compress: true,
      open: true,
      port: 3000,
      proxy: {
        "/api": `http://localhost:${process.env.SERVER_PORT}`,
      },
      static: `./${outputDirectory}`,
      historyApiFallback: true, //For react router
    };
  }

  if (argv.mode === "production") {
    config.entry = ["babel-polyfill", "./src/client"];
    config.devtool = "source-map";
    config.output.filename = "[name].[chunkhash].bundle.js";
    config.output.chunkFilename = "[name].[chunkhash].bundle.js";
    config.optimization = {
      moduleIds: "deterministic",
      runtimeChunk: {
        name: "manifest",
      },
      splitChunks: {
        cacheGroups: {
          vendors: {
            chunks: "all",
          },
          antd: {
            test: /node_modules\/(antd\/).*/,
            name: "antd",
            chunks: "all",
          },
        },
      },
    };
    config.plugins.push(
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i,
      }),
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: [outputDirectory],
      })
    );
    config.performance = {
      hints: "warning",
      // Calculates sizes of gziped bundles.
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith(".js.gz");
      },
    };
  }
  return config;
};
