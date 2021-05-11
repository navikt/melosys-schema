const {endreBehandlingsfrist} = require("./endreBehandlingsfrist");
const { behandling } = require('./behandling');
const { behandlingsresultat } = require('./behandlingsresultat');
const { status } = require('./status');
const { tidligereMedlemsPerioder } = require('./tidligereMedlemsperioder');
const { endreBehandlingstema } = require('./endreBehandlingstema');

module.exports = {
  behandling,
  resultat: behandlingsresultat,
  status,
  tidligereMedlemsPerioder,
  endreBehandlingstema,
  endreBehandlingsfrist,
};
