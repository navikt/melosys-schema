/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testGetMockFiles(navn);
};
const oppsummert = {
  testAll,
};
module.exports.oppsummert = oppsummert;

