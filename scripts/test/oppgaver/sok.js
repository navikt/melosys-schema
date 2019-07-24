/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const MOCK_DATA_OPPGAVE_SOK_DIR = `${MOCK_DATA_DIR}/oppgaver/sok`;
const validate = Schema.schemaValidator('oppgaver-sok-schema.json');

const testAll = () => {
  Schema.prettyTittel('Sok Oppgaver');
  const catalog = Schema.lesKatalogSync(MOCK_DATA_OPPGAVE_SOK_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};
const sok = {
  testAll,
};
module.exports.sok = sok;

