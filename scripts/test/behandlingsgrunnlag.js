const Schema = require('../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testPostMockFiles(navn);
  Schema.testGetMockFiles(navn);
};

const behandlingsgrunnlag = {
  testAll
};
module.exports.behandlingsgrunnlag = behandlingsgrunnlag;
