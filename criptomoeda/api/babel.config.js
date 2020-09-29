module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }], //For transpile for machine node version
    "@babel/preset-typescript", //For transpile typescript to javascript
  ],
  plugins: [
    [
      "module-resolver", //For resolve alias"
      {
        alias: {
          "@dtos": "./src/dtos",
          "@app": "./src/app",
          "@config": "./src/config",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata", //For use decorators"
  ],
};
