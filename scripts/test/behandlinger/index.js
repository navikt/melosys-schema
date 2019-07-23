const { behandling } = require('./behandling');
const { behandlingsresultat } = require('./behandlingsresultat');
const { tidligereMedlemsPerioder } = require('./tidligereMedlemsperioder');

module.exports = {
  behandling,
  resultat: behandlingsresultat,
  medlemsperioder: tidligereMedlemsPerioder,
};
