/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');

const LOVVALGSPERIODER_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/lovvalgsperioder`;
const OPPRINNELIG_LOVVALGSPERIODE_MOCK_DATA_DIR = `${LOVVALGSPERIODER_MOCK_DATA_DIR}/opprinneligPeriode`;

const validate = Schema.schemaValidator('opprinneligLovvalgsperiode-schema.json');

const testAll = () => {
  Schema.prettyTittel('OpprinneligLovvalgsperiode');
  const catalog = Schema.lesKatalogSync(OPPRINNELIG_LOVVALGSPERIODE_MOCK_DATA_DIR);
  catalog.forEach((elem) => Schema.runTest(elem, validate));
};

const opprinneligLovvalgsperiode = {
  testAll,
};
module.exports.opprinneligLovvalgsperiode = opprinneligLovvalgsperiode;
