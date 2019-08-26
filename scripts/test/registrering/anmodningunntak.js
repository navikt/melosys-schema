/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testPostMockFiles(navn);
};
const anmodningunntak = {
  testAll,
};
module.exports.anmodningunntak = anmodningunntak;
