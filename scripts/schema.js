/* eslint-disable node/no-unpublished-require */
const fs = require('fs');

const Demo = require('./test/demo');
const Anmodningsperioder = require('./test/anmodningsperioder');
const Avklartefakta = require('./test/avklartefakta');
const Behandlinger = require('./test/behandlinger');
const Dokumenter = require('./test/dokumenter');
const Eessi = require('./test/eessi');
const Fagsaker = require('./test/fagsaker');
const Inngangsvilkaar = require('./test/inngangsvilkaar');
const Journalforing = require('./test/journalforing');
const Lovvalgsperioder = require('./test/lovvalgsperioder');
const Oppgaver = require('./test/oppgaver');
const Organisasjon = require('./test/organsisasjon');
const LovvalgsperioderOpprinnelig = require('./test/lovvalgsperioderOpprinnelig');
const Personer = require('./test/personer');
const Soknader = require('./test/soknader');
const Saksbehandler = require('./test/saksbehandler');
const Saksflyt = require('./test/saksflyt');

const Vilkaar = require('./test/vilkaar');

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
  ['demo', Demo.demo],
  ['anmodningsperioder', Anmodningsperioder.anmodningsperioder],
  ['anmodningsperioder-svar', Anmodningsperioder.svar],
  ['avklartefakta', Avklartefakta.avklartefakta],
  ['behandlinger-behandling', Behandlinger.behandling],
  ['behandlinger-resultat', Behandlinger.resultat],
  ['behandlinger-status', Behandlinger.status],
  ['behandlinger-tidligeremedlemsperioder', Behandlinger.tidligereMedlemsPerioder],
  ['dokumenter-opprett', Dokumenter.dokument.opprett],
  ['dokumenter-oversikt', Dokumenter.dokument.oversikt],
  ['dokumenter-pdf', Dokumenter.pdf.hent],
  ['dokumenter-pdf-brev-utkast', Dokumenter.pdf.utkast],
  ['eessi-bucer', Eessi.bucer],
  ['eessi-mottakerinstitusjoner', Eessi.mottakerinstitusjoner],
  ['fagsaker', Fagsaker.fagsak],
  ['fagsaker-aktoerer', Fagsaker.aktoerer],
  ['fagsaker-henlegg', Fagsaker.henlegg],
  ['fagsaker-kontaktopplysninger', Fagsaker.kontaktopplysninger],
  ['fagsaker-sok', Fagsaker.sok],
  ['inngangsvilkaar', Inngangsvilkaar.inngangsvilkaar],
  ['journalforing', Journalforing.journalforing],
  ['journalforing-opprett', Journalforing.opprett],
  ['journalforing-tilordne', Journalforing.tilordne],
  ['lovvalgsperioder', Lovvalgsperioder.lovvalgsperioder],
  ['oppgaver-oversikt', Oppgaver.oversikt],
  ['oppgaver-plukk', Oppgaver.plukk],
  ['oppgaver-sok', Oppgaver.sok],
  ['oppgaver-tilbakelegg', Oppgaver.tilbakelegg],
  ['lovvalgsperioder-opprinnelig', LovvalgsperioderOpprinnelig.lovvalgsperioderOpprinnelig],
  ['organisasjoner', Organisasjon.organisasjon],
  ['personer', Personer.personer],
  ['saksbehandler', Saksbehandler.saksbehandler],
  ['saksflyt-anmodningsperioder', Saksflyt.anmodningsperioder],
  ['saksflyt-unntaksperioder-ikkegodkjenn', Saksflyt.unntaksperioder],
  ['saksflyt-vedtak-endreperiode', Saksflyt.vedtak],
  ['saksflyt-vedtak-fatt', Saksflyt.vedtak],
  ['soknader', Soknader.soknader],
  ['vilkaar', Vilkaar.vilkaar],
]);

const testAll = () => {
  katalogMap.forEach((katalog, navn) => katalog.testAll(navn));
};

testAll();
console.log();
console.dir(Schema.oppsummering());
console.log('\nSchema validation completed.\n');

const test = () => {
  testAll();
  const oppsummering = Schema.oppsummering();
  return oppsummering.failure === 0;
};
module.exports.test = test;
