const schema = require('./schema');

describe('schema', () => {
  it('er valid', () => {
    const schemaErValid = schema.test();
    expect(schemaErValid).toBe(true);
  });
});
