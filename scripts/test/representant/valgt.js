/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testGetMockFiles(navn);
  Schema.testPostMockFiles(navn);
};
const valgt = {
  testAll,
};
module.exports.valgt = valgt;
