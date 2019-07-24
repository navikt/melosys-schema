/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');
const MOCK_DATA_ORG_DIR = `${MOCK_DATA_DIR}/organisasjoner`;

const validate = Schema.schemaValidator('organisasjoner-schema.json');

const testAll = navn => {
  Schema.printWhiteText(navn);
  const catalog = Schema.lesKatalogSync(MOCK_DATA_ORG_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const organisasjon = {
  testAll,
};
module.exports.organisasjon = organisasjon;

