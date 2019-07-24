/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');
const MOCK_FAGFSAKER_SOK_DIR = `${MOCK_DATA_DIR}/fagsaker/sok`;

const validate = Schema.schemaValidator('sok-fagsaker-schema.json');

const testAll = navn => {
  Schema.printWhiteText(navn);
  const catalog = Schema.lesKatalogSync(MOCK_FAGFSAKER_SOK_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const sok = {
  testAll
};
module.exports.sok = sok;

