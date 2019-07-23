/* eslint-disable node/no-unpublished-require */
const log4js = require('log4js');
const logger = log4js.getLogger('webmock');

const consoleMerge = (loglevel, body) => ({ loglevel, timestamp: new Date().toISOString(), ...body});

/*
module.exports.trace = (req, res) => {
  const body = req.body;
  //const jsonBody = Utils.isJSON(body) ? JSON.parse(body) : body;
  console.trace(body);
  res.status(200).send('OK');
};
*/
module.exports.debug = async (req, res) => {
  const { body } = req;
  const log = consoleMerge('debug', body);
  console.debug(log);
  logger.debug(body);
  res.status(200).send('OK');
};
module.exports.info = async (req, res) => {
  const { body } = req;
  const log = consoleMerge('info', body);
  console.info(log);
  logger.info(body);
  res.status(200).send('OK');
};
module.exports.warn = async (req, res) => {
  const { body } = req;
  const log = consoleMerge('warn', body);
  console.warn(log);
  logger.warn(body);
  res.status(200).send('OK');
};
module.exports.error = async (req, res) => {
  const { body } = req;
  const log = consoleMerge('error', body);
  console.error(log);
  logger.error(body);
  res.status(200).send('OK');
};
