const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testPostMockFiles(navn);
};
const virksomheter = {
  testAll,
};
module.exports.virksomheter = virksomheter;
