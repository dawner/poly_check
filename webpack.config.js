const Dotenv = require("dotenv-webpack")

module.exports = {
  devtool: "source-map",
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
  ],
}
