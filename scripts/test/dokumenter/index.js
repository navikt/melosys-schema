const { opprett } = require('./opprett');
const { oversikt } = require('./oversikt');
const { pdf } = require('./pdf');

module.exports = {
  dokument: {
    opprett,
    oversikt,
  },
  pdf,
};
