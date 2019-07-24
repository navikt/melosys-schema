/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');

const INNGANG_MOCK_DIR = `${MOCK_DATA_DIR}/inngang`;
const validate = Schema.schemaValidator('inngang-schema.json');

const testAll = () => {
  Schema.prettyTittel('Inngang');
  const catalog = Schema.lesKatalogSync(INNGANG_MOCK_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const inngang = {
  testAll,
};
module.exports.inngang = inngang;

