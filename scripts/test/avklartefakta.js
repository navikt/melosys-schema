/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');
const AVKLARTEFAKTA_MOCK_DIR = `${MOCK_DATA_DIR}/avklartefakta`;

const validate = Schema.schemaValidator('avklartefakta-schema.json');
/*
const testAvklaringPost = () => {
  Schema.prettyTittel('Avklartefakta/post');
  const elem = lesAvklartefaktaPostMock();
  return Schema.runTest(elem, validate);
};
*/
const testAll = navn => {
  Schema.printWhiteText(navn);
  const catalog = Schema.lesKatalogSync(AVKLARTEFAKTA_MOCK_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));

  //testAvklaringPost();
};

const avklartefakta = {
  testAll,
};
module.exports.avklartefakta = avklartefakta;

