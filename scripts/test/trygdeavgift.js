const Schema = require('../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testGetMockFiles(navn);
  Schema.testPutMockFiles(navn);

};
const trygdeavgift = {
  testAll,
};
module.exports.trygdeavgift = trygdeavgift;
