/* eslint-disable node/no-unpublished-require */
const Ajv = require('ajv');
const { JSONPath } = require('jsonpath-plus');
const glob = require('glob');
const _ = require('lodash');
const log4js = require('log4js');
const logger = log4js.getLogger('schema');
const colors = require('colors/safe');
const emoji = require('node-emoji');

const { MOCK_DATA_DIR, SCHEMA_DIR, DEFINITION_SCHEMA } = require('../../mock.config');
const Utils = require('./utils');

const oppsummering = {
  success: 0,
  failure: 0,
};

const incSuccess = () => {
  oppsummering.success += 1;
};
const incFailure = () => {
  oppsummering.failure += 1;
};

module.exports.oppsummering = () => {
  return oppsummering;
};

module.exports.lesSchemaSync = schemapath => {
  return Utils.readJsonAndParseSync(schemapath);
};
module.exports.lesSchemaASync = schemapath => {
  return Utils.readJsonAndParseSync(schemapath);
};
const lesSchemaFileSync = schemafile => {
  const schemapath = `${SCHEMA_DIR}/${schemafile}`;
  return Utils.readJsonAndParseSync(schemapath);
};
module.exports.lesSchemaFileSync = lesSchemaFileSync;

module.exports.lesSchemaFilesSync = schemafiles => {
  console.log(schemafiles);
  let schemas = [];
  schemafiles.forEach(filename => {
    const schema = lesSchemaFileSync(filename);
    schemas.push(schema);
  });
  return schemas;
};
const lesSchemaDefinitonsSync = () => {
  return Utils.readJsonAndParseSync(DEFINITION_SCHEMA);
};
module.exports.lesSchemaDefinitonsSync = lesSchemaDefinitonsSync;

const humanReadableErrors = (allErrors = []) => {
  return allErrors.map(singleError => {
    const { keyword = '', dataPath = '', params = {}, message = '' } = singleError;
    const { additionalProperty } = params;
    const baseText = `[${keyword.toUpperCase()}] ${dataPath}: ${message}`;
    return additionalProperty ? `${baseText}: ${additionalProperty}` : baseText;
  })
};

const katalogNavn = path => {
  const splits = path.slice(MOCK_DATA_DIR.length+1).split('/');
  return splits.slice(0,splits.length-1).join('/');
};
module.exports.katalogNavn = katalogNavn;

module.exports.katalogTittel = path => {
  const katalog = katalogNavn(path);
  return katalog.charAt(0).toLocaleUpperCase() + katalog.slice(1);
};

const lesKatalogSync = dirpath => {
  let catalog = [];
  const files = glob.sync('*.json5', {
    cwd: dirpath,
    ignore: 'schema.json$'
  });
  files.forEach(navn => {
    const filepath = `${dirpath}/${navn}`;
    const document = Utils.readJsonAndParseSync(filepath);
    catalog.push({
      navn,
      document
    });
  });
  return catalog;
};
module.exports.lesKatalogSync = lesKatalogSync;

module.exports.lesKatalogElement = path => {
  const document =  Utils.readJsonAndParseSync(path);
  const dirs = path.split('/');
  const navn = dirs[dirs.length-1];
  return {
    navn,
    document,
  };
};
const lesEmbeddedSchemas = schema => {
  const SCHEMA_URI = './';
  const refs = JSONPath({ path: '$..$ref', json: schema });
  const defs = refs.filter(item => item.startsWith(SCHEMA_URI));
  const embeddedSchemas = [];
  const schemaNames = [];

  if (defs && defs.length > 0) {
    defs.forEach (def => {
      const hashPos = def.indexOf('#');
      const name = def.substring(SCHEMA_URI.length, hashPos);
      if (name.startsWith('definitions-schema.json')) return;
      if(schemaNames.includes(name)) return;
      schemaNames.push(name);
      const embeddedSchema = lesSchemaFileSync(name);
      embeddedSchemas.push(embeddedSchema);
    });
  }
  return embeddedSchemas;
};
module.exports.lesEmbeddedSchemas = lesEmbeddedSchemas;

const schemaValidator = schemaNavn => {
  const definitions = lesSchemaDefinitonsSync();

  const schema = lesSchemaFileSync(schemaNavn);
  const embeddedSchemas = lesEmbeddedSchemas(schema);
  const ajv = new Ajv({allErrors: true});
  return ajv.addSchema([definitions, ...embeddedSchemas]).compile(schema);
};
module.exports.schemaValidator = schemaValidator;

const runTest = (data, validate, color = 'green') => {
  const textColor = {
    cyan: colors.cyan,
    red: colors.red,
    green: colors.green,
    blue: colors.blue,
  };
  const { navn, document } = data;
  const valid = validate(document);
  if (valid) {
    incSuccess();
    console.log(' ',emoji.get('ballot_box_with_check'),' ',textColor[color](navn));
  }
  else {
    incFailure();
    console.log(colors.red('\tInvalid: '+navn));
    humanReadableErrors(validate.errors).forEach((msg, index) => {
      console.log('\t', (index < 10 ? ` ${index}` : index), msg);
      logger.error(`${navn} ${msg}`);
    });
  }
};
module.exports.runTest = runTest;

module.exports.testPostMockFiles = navn => {
  const POST_DIR = `${MOCK_DATA_DIR}/${navn}/post`;
  const validate = schemaValidator(`${navn}-post-schema.json`);
  const catalog = lesKatalogSync(POST_DIR);
  catalog.forEach((elem) => runTest(elem, validate, 'cyan'));
};

module.exports.testPutMockFiles = navn => {
  const PUT_DIR = `${MOCK_DATA_DIR}/${navn}/put`;
  const validate = schemaValidator(`${navn}-put-schema.json`);
  const catalog = lesKatalogSync(PUT_DIR);
  catalog.forEach((elem) => runTest(elem, validate, 'cyan'));
};

module.exports.testGetMockFiles = navn => {
  const GET_DIR = `${MOCK_DATA_DIR}/${navn}`;
  const validate = schemaValidator(`${navn}-schema.json`);
  const catalog = lesKatalogSync(GET_DIR);
  catalog.forEach((elem) => runTest(elem, validate));
};

module.exports.printWhiteText = text => {
  const prettyfied = _.startCase(text);
  console.log(colors.white(prettyfied));
};

module.exports.printGreenText = text => {
  console.log(colors.green(text));
};
module.exports.printRedText = text => {
  console.log(colors.red(text));
};
