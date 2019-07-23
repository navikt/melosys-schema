/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const MOCK_DATA_FAGSAK_DIR = `${MOCK_DATA_DIR}/fagsaker`;

const validate = Schema.schemaValidator('fagsaker-schema.json');

const testAll = () => {
  Schema.prettyTittel('Fagsaker Fagsak');
  const catalog = Schema.lesKatalogSync(MOCK_DATA_FAGSAK_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};


const fagsak = {
  testAll
};
module.exports.fagsak = fagsak;

