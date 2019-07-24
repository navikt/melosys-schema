/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');
const MOCK_DATA_SAKSBEHANDLER_DIR = `${MOCK_DATA_DIR}/saksbehandler`;
const validate = Schema.schemaValidator('saksbehandler-schema.json');

const testAll = navn => {
  Schema.printWhiteText(navn);
  const catalog = Schema.lesKatalogSync(MOCK_DATA_SAKSBEHANDLER_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const Saksbehandler = {
  testAll
};
module.exports.Saksbehandler = Saksbehandler;

