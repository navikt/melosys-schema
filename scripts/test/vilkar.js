/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');
const VILKAR_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/vilkar`;

const validate = Schema.schemaValidator('vilkar-schema.json');

const testAll = () => {
  Schema.prettyTittel('Vilkar');
  const catalog = Schema.lesKatalogSync(VILKAR_MOCK_DATA_DIR);
  catalog.forEach((elem) => Schema.runTest(elem, validate));
};


const vilkar = {
  testAll,
};
module.exports.vilkar = vilkar;

