/* eslint-disable node/no-unpublished-require */
const fs = require('fs');

const { demo } = require('./test/demo');
const Anmodningsperioder = require('./test/anmodningsperioder');
const { avklartefakta } = require('./test/avklartefakta');
const Behandlinger = require('./test/behandlinger');
const { dokumenter } = require('./test/dokumenter');
const Fagsaker = require('./test/fagsaker');
const { inngang } = require('./test/inngang');
const { journalforing } = require('./test/journalforing');
const { lovvalgsperioder } = require('./test/lovvalgsperioder');
const Oppgaver = require('./test/oppgaver');
const { organisasjon } = require('./test/organsisasjon');
const { opprinneligLovvalgsperiode } = require('./test/opprinneligLovvalgsperiode');
const { person } = require('./test/person');
const { soknad } = require('./test/soknad');
const { Saksbehandler } = require('./test/saksbehandler');
const { vilkar } = require('./test/vilkar');

const Schema = require('./utils/schema-util');

const createLogDirIfnotExists = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir);
const LOGDIR = `${process.cwd()}/logdir`;
createLogDirIfnotExists(LOGDIR);

const SCHEMA_LOG_FILE = `${LOGDIR}/schema-errors.log`;
const log4js = require('log4js');
log4js.configure({
  appenders: { schema: { type: 'file', filename: SCHEMA_LOG_FILE } },
  categories: { default: { appenders: ['schema'], level: 'error' } }
});

const katalogMap = new Map([
  ['Demo', demo],
  ['Anmodningsperioder', Anmodningsperioder.anmodningsperioder],
  ['Anmodningsperioder/svar', Anmodningsperioder.svar],
  ['Avklartefakta', avklartefakta],
  ['Behandlinger/behandling', Behandlinger.behandling],
  ['Behandlinger/medlemsperioder', Behandlinger.medlemsperioder],
  ['Behandlinger/resultat', Behandlinger.resultat],
  ['Dokumenter', dokumenter],
  ['Fagsaker', Fagsaker.fagsak],
  ['Fagsaker/aktoerer', Fagsaker.aktoer],
  ['Fagsaker/kontaktopplysninger', Fagsaker.kontaktopplysninger],
  ['Fagsaker/sok', Fagsaker.sok],
  ['Inngang', inngang],
  ['Journalforing', journalforing],
  ['Lovvalgsperioder', lovvalgsperioder],
  ['Oppgaver', Oppgaver.oppgaver],
  ['Oppgaver/sok', Oppgaver.sok],
  ['OpprinneligLovvalgsperiode', opprinneligLovvalgsperiode],
  ['Organisasjoner', organisasjon],
  ['Personer', person],
  ['Saksbehandler', Saksbehandler],
  ['Soknader', soknad],
  ['Vilkar', vilkar],
]);

const testAll = () => {
  katalogMap.forEach((katalog, navn) => katalog.testAll(navn));
};

testAll();
console.log();
console.dir(Schema.oppsummering());
console.log('\nSchema validation completed.\n');
