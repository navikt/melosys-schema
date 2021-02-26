const Schema = require('../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testPostMockFiles(navn);
};
const medfolgendefamilie = {
  testAll,
};
module.exports.medfolgendefamilie = medfolgendefamilie;
