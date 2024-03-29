/* eslint-disable node/no-unpublished-require */
const fs = require('fs');

const Demo = require('./test/demo');
const Anmodningsperioder = require('./test/anmodningsperioder');
const Avklartefakta = require('./test/avklartefakta');
const Behandlinger = require('./test/behandlinger');
const Behandlingsgrunnlag = require('./test/behandlingsgrunnlag');
const DokumenterV2 = require('./test/dokumenter-v2');
const Dokumenter = require('./test/dokumenter');
const Eessi = require('./test/eessi');
const Fagsaker = require('./test/fagsaker');
const Journalforing = require('./test/journalforing');
const Kodeverk = require('./test/kodeverk');
const Lovvalgsperioder = require('./test/lovvalgsperioder');
const Medlemskapsperioder = require('./test/medlemskapsperioder');
const Oppgaver = require('./test/oppgaver');
const Organisasjon = require('./test/organsisasjon');
const LovvalgsperioderOpprinnelig = require('./test/lovvalgsperioderOpprinnelig');
const Representant = require('./test/representant');
const Saksbehandler = require('./test/saksbehandler');
const Saksflyt = require('./test/saksflyt');
const Statistikk = require('./test/statistikk');
const Trygdeavgift = require('./test/trygdeavgift');
const Utpekingsperioder = require('./test/utpekingsperioder');
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
  ['avklartefakta-oppsummering', Avklartefakta.oppsummering],
  ['avklartefakta-virksomheter', Avklartefakta.virksomheter],
  ['avklartefakta-medfolgendefamilie', Avklartefakta.medfolgendefamilie],
  ['behandlinger-behandling', Behandlinger.behandling],
  ['behandlinger-endrebehandlingstema', Behandlinger.endreBehandlingstema],
  ['behandlinger-endrebehandlingsfrist', Behandlinger.endreBehandlingsfrist],
  ['behandlinger-resultat', Behandlinger.resultat],
  ['behandlinger-status', Behandlinger.status],
  ['behandlinger-tidligeremedlemsperioder', Behandlinger.tidligereMedlemsPerioder],
  ['dokumenter-opprett', Dokumenter.dokument.opprett],
  ['dokumenter-oversikt', Dokumenter.dokument.oversikt],
  ['dokumenter-pdf', Dokumenter.pdf.hent],
  ['dokumenter-pdf-utkast-brev', Dokumenter.pdf.utkast.brev],
  ['dokumenter-pdf-utkast-sed', Dokumenter.pdf.utkast.sed],
  ['dokumenter-v2-mulige-mottakere', DokumenterV2.muligemottakere],
  ['dokumenter-v2-utkast', DokumenterV2.utkast],
  ['dokumenter-v2-opprett', DokumenterV2.opprett],
  ['dokumenter-v2-tilgjengelige-maler', DokumenterV2.tilgjengeligemaler],
  ['eessi-bucer', Eessi.bucer],
  ['eessi-mottakerinstitusjoner', Eessi.mottakerinstitusjoner],
  ['fagsaker', Fagsaker.fagsak],
  ['fagsaker-aktoerer', Fagsaker.aktoerer],
  ['fagsaker-henlegg', Fagsaker.henlegg],
  ['fagsaker-henleggvideresend', Fagsaker.henleggvideresend],
  ['fagsaker-kontaktopplysninger', Fagsaker.kontaktopplysninger],
  ['fagsaker-notater', Fagsaker.notater],
  ['fagsaker-opprett', Fagsaker.opprett],
  ['fagsaker-revurder', Fagsaker.revurder],
  ['fagsaker-sok', Fagsaker.sok],
  ['fagsaker-utpek', Fagsaker.utpek],
  ['journalforing', Journalforing.journalforing],
  ['journalforing-opprett', Journalforing.opprett],
  ['journalforing-sed', Journalforing.sed],
  ['journalforing-tilordne', Journalforing.tilordne],
  ['kodeverk-nav-felles-hentkodeverk', Kodeverk.hentkodeverk],
  ['kodeverk-melosys-internt-folketrygden', Kodeverk.folketrygden],
  ['lovvalgsperioder', Lovvalgsperioder.lovvalgsperioder],
  ['medlemskapsperioder', Medlemskapsperioder.medlemskapsperioder],
  ['medlemskapsperioder-bestemmelse', Medlemskapsperioder.bestemmelse],
  ['oppgaver-oversikt', Oppgaver.oversikt],
  ['oppgaver-plukk', Oppgaver.plukk],
  ['oppgaver-tilbakelegg', Oppgaver.tilbakelegg],
  ['oppgaver-sok', Oppgaver.sok],
  ['lovvalgsperioder-opprinnelig', LovvalgsperioderOpprinnelig.lovvalgsperioderOpprinnelig],
  ['representant-liste', Representant.liste],
  ['representant-representant', Representant.representant],
  ['representant-valgt', Representant.valgt],
  ['organisasjoner', Organisasjon.organisasjon],
  ['saksbehandler', Saksbehandler.saksbehandler],
  ['saksflyt-anmodningsperioder-bestill', Saksflyt.anmodningsperioder],
  ['saksflyt-utpeking-avvis', Saksflyt.utpekingavvis],
  ['saksflyt-unntaksperioder-godkjenn', Saksflyt.unntaksperioder.godkjenn],
  ['saksflyt-unntaksperioder-ikkegodkjenn', Saksflyt.unntaksperioder.ikkegodkjenn],
  ['saksflyt-vedtak-endre', Saksflyt.vedtak.endre],
  ['saksflyt-vedtak-fatt', Saksflyt.vedtak.fatt],
  ['statistikk', Statistikk.statistikk],
  ['trygdeavgift-beregning', Trygdeavgift.beregning],
  ['trygdeavgift-grunnlag', Trygdeavgift.grunnlag],
  ['behandlingsgrunnlag', Behandlingsgrunnlag.behandlingsgrunnlag],
  ['utpekingsperioder', Utpekingsperioder.utpekingsperioder],
  ['vilkaar', Vilkaar.vilkaar],
]);

const testAll = () => {
  katalogMap.forEach((katalog, navn) => katalog.testAll(navn));
};

testAll();
console.log();
console.log('Antall endepunkter:', katalogMap.size);
console.dir(Schema.oppsummering());
console.log('\nSchema validation completed.\n');

const test = () => {
  testAll();
  const oppsummering = Schema.oppsummering();
  return oppsummering.failure === 0;
};
module.exports.test = test;
