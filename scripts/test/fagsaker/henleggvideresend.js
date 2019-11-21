const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testPostMockFiles(navn);
};
const henleggvideresend = {
  testAll
};
module.exports.henleggvideresend = henleggvideresend;
