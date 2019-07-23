/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');
const MOCK_DOKUMENTER_DATA_DIR = `${MOCK_DATA_DIR}/dokumenter`;

const testAll = () => {
  Schema.prettyTittel('Dokumenter');
  const validate = Schema.schemaValidator('dokumenter-oversikt-schema.json');
  const catalog = Schema.lesKatalogSync(MOCK_DOKUMENTER_DATA_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const dokumenter = {
  testAll,
};
module.exports.dokumenter = dokumenter;

