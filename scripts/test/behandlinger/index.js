const { behandling } = require('./behandling');
const { behandlingsresultat } = require('./behandlingsresultat');
const { status } = require('./status');
const { tidligereMedlemsPerioder } = require('./tidligereMedlemsperioder');

module.exports = {
  behandling,
  resultat: behandlingsresultat,
  status,
  tidligereMedlemsPerioder,
};
