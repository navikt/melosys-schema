/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const BEHANDLINGER_MOCK_DIR = `${MOCK_DATA_DIR}/behandlinger`;
const MEDLEMSPERIODER_MOCK_DIR = `${BEHANDLINGER_MOCK_DIR}/tidligeremedlemsperioder`;

const validate = Schema.schemaValidator('behandlinger-medlemsperioder-schema.json');
const printTitle = () => Schema.prettyTittel('Behandlinger Tidligere MedlemsPerioder');

const testAll = () => {
  printTitle();
  const catalog = Schema.lesKatalogSync(MEDLEMSPERIODER_MOCK_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const testOne = (path) => {
  printTitle();
  const elem = Schema.lesKatalogElement(path);
  return Schema.runTest(elem, validate);
};

const tidligereMedlemsPerioder = {
  testAll,
  testOne,
};
module.exports.tidligereMedlemsPerioder = tidligereMedlemsPerioder;

