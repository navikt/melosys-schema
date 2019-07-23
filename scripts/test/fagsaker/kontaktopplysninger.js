/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');
const KONTAKT_OPPLYSNINGER_DATA_DIR = `${MOCK_DATA_DIR}/fagsaker/kontaktopplysninger`;

const validate = Schema.schemaValidator('kontaktopplysninger-schema.json');

const printTitle = () => Schema.prettyTittel('Fagsaker Kontaktopplysninger');

const testAll = () => {
  printTitle();
  const catalog = Schema.lesKatalogSync(KONTAKT_OPPLYSNINGER_DATA_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const kontaktopplysninger = {
  testAll
};
module.exports.kontaktopplysninger = kontaktopplysninger;
