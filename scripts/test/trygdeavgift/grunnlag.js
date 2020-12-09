const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testGetMockFiles(navn);
  Schema.testPutMockFiles(navn);

};
const grunnlag = {
  testAll,
};
module.exports.grunnlag = grunnlag;
