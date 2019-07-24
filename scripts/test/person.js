const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config'); // eslint-disable-line node/no-unpublished-require
const PERSON_MOCK_DATA_DIR = `${MOCK_DATA_DIR}/personer`;

const validate = Schema.schemaValidator('person-schema.json');

const testAll = navn => {
  Schema.printWhiteText(navn);
  const catalog = Schema.lesKatalogSync(PERSON_MOCK_DATA_DIR);
  catalog.forEach(elem => Schema.runTest(elem, validate));
};

const person = {
  testAll
};
module.exports.person = person;

