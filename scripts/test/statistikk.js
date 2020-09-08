const Schema = require('../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testGetMockFiles(navn);
};
const statistikk = {
  testAll,
};
module.exports.statistikk = statistikk;
