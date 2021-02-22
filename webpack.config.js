const configuration = require('webpack-config');

configuration.environment.setAll({
  env: () => process.env.NODE_ENV,
});

module.exports = new configuration.default().extend(
  `conf/webpack.[env].config.js`
);
