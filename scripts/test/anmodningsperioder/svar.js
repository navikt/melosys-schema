/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');
const ANMODNINGSPERIODER_SVAR_MOCK_DIR = `${MOCK_DATA_DIR}/anmodningsperioder/svar`;

const validate = Schema.schemaValidator('anmodningsperiodersvar-schema.json');

const testAll = () => {
  const catalog = Schema.lesKatalogSync(ANMODNINGSPERIODER_SVAR_MOCK_DIR);
  Schema.prettyTittel('Anmodningsperioder/Svar');
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  const tittel = Schema.katalogTittel(path);
  Schema.prettyTittel(tittel);
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const svar = {
  testAll,
  testOne,
};
module.exports.svar = svar;

