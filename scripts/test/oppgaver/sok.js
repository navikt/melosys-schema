/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
/*
const { MOCK_DATA_DIR } = require('../../../mock.config');

const MOCK_DATA_OPPGAVE_SOK_DIR = `${MOCK_DATA_DIR}/oppgaver/sok`;
const validate = Schema.schemaValidator('oppgaver-sok-schema.json');

const testAll = navn => {
  Schema.printWhiteText(navn);
  const catalog = Schema.lesKatalogSync(MOCK_DATA_OPPGAVE_SOK_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};
*/

const testAll = navn => {
  Schema.printWhiteText(navn);
  Schema.testGetMockFiles(navn);
};
const sok = {
  testAll,
};
module.exports.sok = sok;

