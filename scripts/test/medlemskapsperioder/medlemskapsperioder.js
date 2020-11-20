/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testPostMockFiles(navn);
  Schema.testPutMockFiles(navn);
  Schema.testGetMockFiles(navn);
};

const medlemskapsperioder = {
  testAll,
};
module.exports.medlemskapsperioder = medlemskapsperioder;
