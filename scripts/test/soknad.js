const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config'); // eslint-disable-line node/no-unpublished-require
const MOCK_SOKNAD_DIR = `${MOCK_DATA_DIR}/soknader`;

const validate = Schema.schemaValidator('soknad-schema.json');

const testAll = () => {
  Schema.prettyTittel('Soknad');
  const katalog = Schema.lesKatalogSync(MOCK_SOKNAD_DIR);
  katalog.forEach(elem => Schema.runTest(elem, validate));
};

const soknad = {
  testAll
};
module.exports.soknad = soknad;

