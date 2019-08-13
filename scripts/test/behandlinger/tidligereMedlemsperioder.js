/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testPostMockFiles(navn);
  Schema.testGetMockFiles(navn);
};

const tidligereMedlemsPerioder = {
  testAll,
};
module.exports.tidligereMedlemsPerioder = tidligereMedlemsPerioder;

