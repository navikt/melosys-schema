/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const BEHANDLINGER_MOCK_DIR = `${MOCK_DATA_DIR}/behandlinger`;
const BEHANDLING_MOCK_DIR = `${BEHANDLINGER_MOCK_DIR}/behandling`;
const validate = Schema.schemaValidator('behandlinger-behandling-schema.json');

const testAll = () => {
  Schema.prettyTittel('Behandling');
  const catalog = Schema.lesKatalogSync(BEHANDLING_MOCK_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const behandling = {
  testAll
};

module.exports.behandling = behandling;

