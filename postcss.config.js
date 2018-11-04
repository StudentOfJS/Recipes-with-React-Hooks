const postCssNext = require("postcss-cssnext");
const postCssImport = require("postcss-import");

module.exports = {
  plugins: [postCssImport, postCssNext]
};
