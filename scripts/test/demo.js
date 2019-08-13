/* eslint-disable node/no-unpublished-require */
const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');
const Schema = require('../utils/schema-util');
// Example from; https://jsonschema.net/
const jsonJS = {
  sender: {
    id: 'USER_ID',
  },
  recipient: {
    id: 'PAGE_ID',
  },
  timestamp: 1458692752478,
  message: {
    mid: 'mid.1457764197618:41d102a3e1ae206a38',
    seq: 73,
    text: 'hello, world!',
    quick_reply: {
      payload: 'DEVELOPER_DEFINED_PAYLOAD',
    },
  },
};

const schemaJS = {
  $id: 'http://example.com/example.json',
  type: 'object',
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  properties: {
    checked: {
      $id: '/properties/checked',
      type: 'boolean',
      title: 'The Checked Schema ',
      'default': false,
      examples: [
        false,
      ],
    },
    dimensions: {
      $id: '/properties/dimensions',
      type: 'object',
      properties: {
        width: {
          $id: '/properties/dimensions/properties/width',
          type: 'integer',
          title: 'The Width Schema ',
          'default': 0,
        },
        height: {
          $id: '/properties/dimensions/properties/height',
          type: 'integer',
          title: 'The Height Schema ',
          'default': 0,
          examples: [
            10,
          ],
        },
      },
    },
    id: {
      $id: '/properties/id',
      type: 'integer',
      title: 'The Id Schema ',
      'default': 0,
      examples: [
        1,
      ],
    },
    name: {
      $id: '/properties/name',
      type: 'string',
      title: 'The Name Schema ',
      'default': '',
      examples: [
        'A green door',
      ],
    },
    price: {
      $id: '/properties/price',
      type: 'number',
      title: 'The Price Schema ',
      'default': 0,
      examples: [
        12.5,
      ],
    },
    tags: {
      $id: '/properties/tags',
      type: 'array',
      items: {
        $id: '/properties/tags/items',
        type: 'string',
        title: 'The 0th Schema ',
        'default': '',
        examples: [
          'home',
          'green',
        ],
      },
    },
  },
};

const validate = ajv.compile(schemaJS);

function runTest(data) {
  const valid = validate(data);
  if (valid) {
    Schema.printGreenText('\tValid!');
  }
  else {
    console.log(colors.red('\tInvalid: ' + ajv.errorsText(validate.errors)));
  }
}

const testAll = navn => {
  Schema.printWhiteText(navn);
  runTest(jsonJS);
};

const demo = {
  testAll,
};
module.exports.demo = demo;
