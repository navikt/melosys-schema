/* eslint-disable node/no-unpublished-require */
const Schema = require('../utils/schema-util');
const { MOCK_DATA_DIR } = require('../../mock.config');
const MOCK_DATA_JOURNALFORING_DIR = `${MOCK_DATA_DIR}/journalforing`;

/*
const testJournalPost = (postnavn) => {
  const postPath = `${MOCK_DATA_JOURNALFORING_DIR}/post/${postnavn}.json`;
  const postSchemaPath = `${SCHEMA_DIR}/journalforing-${postnavn}-schema.json`;

  const elem = Schema.lesKatalogElement(postPath);
  const postSchema = Schema.lesSchemaSync(postSchemaPath);

  const postValidator = schemaValidator(postSchema);

  Schema.runTest(elem, postValidator);
};
*/

const testAll = () => {
  Schema.prettyTittel('Journalforing');
  const catalog = Schema.lesKatalogSync(MOCK_DATA_JOURNALFORING_DIR);
  const validate = Schema.schemaValidator('journalforing-schema.json');
  catalog.forEach(elem => Schema.runTest(elem, validate));

  //Schema.prettyTittel('Journalforing/post');
  //testJournalPost('opprett');
  //testJournalPost('tilordne');
};

const journalforing = {
  testAll,
};
module.exports.journalforing = journalforing;
