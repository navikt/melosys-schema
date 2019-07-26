/* eslint-disable node/no-unpublished-require */
const Schema = require('../../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../../mock.config');

const MOCK_DATA_OPPGAVER_DIR = `${MOCK_DATA_DIR}/oppgaver`;

const testAll = () => {
  Schema.prettyTittel('Oppgaver');
  const catalog = Schema.lesKatalogSync(MOCK_DATA_OPPGAVER_DIR);
  catalog.forEach((elem) => {
    const { navn } = elem;
    const fornavn = navn.split('.')[0];
    const schemanavn = `oppgaver-${fornavn}-schema.json`;
    const validate = Schema.schemaValidator(schemanavn);
    Schema.runTest(elem, validate);
  });
};


const oppgaver = {
  testAll,
};
module.exports.oppgaver = oppgaver;
