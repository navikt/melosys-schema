/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const AKTOER_DATA_DIR = `${MOCK_DATA_DIR}/fagsaker/aktoerer`;
// const AKTOER_DATA_POST_DIR = `${AKTOER_DATA_DIR}/post`;

const validate = Schema.schemaValidator('aktoer-schema.json');

const testAll = navn => {
  Schema.printWhiteText(navn);
  const catalog = Schema.lesKatalogSync(AKTOER_DATA_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};


const aktoer = {
  testAll
};
module.exports.aktoer = aktoer;
