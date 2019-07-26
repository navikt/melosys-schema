/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const BEHANDLINGER_MOCK_DIR = `${MOCK_DATA_DIR}/behandlinger`;
const BEHANDLINGSRESULTAT_MOCK_DATA_DIR = `${BEHANDLINGER_MOCK_DIR}/resultat`;

const validate = Schema.schemaValidator('behandlingsresultat-schema.json');

const testAll = () => {
  Schema.prettyTittel('Behandlingsresultat');
  const catalog = Schema.lesKatalogSync(BEHANDLINGSRESULTAT_MOCK_DATA_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};


const behandlingsresultat = {
  testAll,
};

module.exports.behandlingsresultat = behandlingsresultat;

