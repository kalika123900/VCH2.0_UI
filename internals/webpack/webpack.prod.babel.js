const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = require("./webpack.base.babel")({
  mode: "production",

  // In production, we skip all hot-reloading stuff
  entry: [
    require.resolve("react-app-polyfill/ie11"),
    path.join(process.cwd(), "app/app.js"),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js",
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
        parallel: true,
        cache: true,
        sourceMap: true,
      }),
    ],
    nodeEnv: "production",
    sideEffects: true,
    concatenateModules: false,
    runtimeChunk: true,
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: "app/index.html",
    })
  ],

  performance: {
    assetFilter: (assetFilename) =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});