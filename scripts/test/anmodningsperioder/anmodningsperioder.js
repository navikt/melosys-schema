const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config'); // eslint-disable-line node/no-unpublished-require
const ANMODNINGSPERIODER_MOCK_DIR = `${MOCK_DATA_DIR}/anmodningsperioder`;

const validate = Schema.schemaValidator('anmodningsperioder-get-schema.json');

const testAll = navn => {
  const catalog = Schema.lesKatalogSync(ANMODNINGSPERIODER_MOCK_DIR);
  Schema.printWhiteText(navn);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};


const anmodningsperioder = {
  testAll
};
module.exports.anmodningsperioder = anmodningsperioder;

