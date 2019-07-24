/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');
const LOVVALGSPERIODER_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/lovvalgsperioder`;

const validate = Schema.schemaValidator('lovvalgsperioder-schema.json');

const testAll = navn => {
  Schema.printWhiteText(navn);
  const catalog = Schema.lesKatalogSync(LOVVALGSPERIODER_MOCK_DATA_DIR);
  catalog.forEach((elem) => Schema.runTest(elem, validate));
};

const lovvalgsperioder = {
  testAll,
};
module.exports.lovvalgsperioder = lovvalgsperioder;

