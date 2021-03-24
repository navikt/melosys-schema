/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testGetMockFiles(navn);
};

const tilgjengeligemaler = {
  testAll,
};
module.exports.tilgjengeligemaler = tilgjengeligemaler;
