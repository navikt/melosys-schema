/* eslint-disable node/no-unpublished-require */
const Schema = require('../../../utils/schema-util');

const testAll = navn => {
  Schema.printWhiteText(navn);
  console.log('\tPDF files is not validated');
};

const pdf = {
  testAll,
};
module.exports.pdf = pdf;

