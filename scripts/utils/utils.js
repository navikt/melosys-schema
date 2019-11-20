const fs = require('fs');
const JSON5 = require('json5');

const readFileSync = (path) => {
  return fs.readFileSync(path, 'utf8');
};
module.exports.readFileSync = readFileSync;

module.exports.readJsonAndParseSync = (path) => {
  return JSON5.parse(readFileSync(path));
};

module.exports.existsSync = (path) => fs.existsSync(path);

