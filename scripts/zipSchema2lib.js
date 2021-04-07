const fs = require('fs');
const path = require('path');
// eslint-disable-next-line node/no-unpublished-require
const zipdir = require('zip-dir');

const args = process.argv.slice(2);
const versionArg = args[0];

const SCHEMA_DIR = `${process.cwd()}/schema`;
const LIB_DIR = `${process.cwd()}/lib`;
const version = versionArg || `${process.env.npm_package_version}`;
const scope = path.dirname(process.env.npm_package_name);
const name = path.basename(process.env.npm_package_name);
const SAVE_DIR = `${LIB_DIR}/${scope}`;

if (!fs.existsSync(`${LIB_DIR}/${scope}`)) {
  fs.mkdirSync(`${LIB_DIR}`);
  fs.mkdirSync(SAVE_DIR);
}

zipdir(SCHEMA_DIR, { saveTo: `${SAVE_DIR}/${name}-${version}.zip` }, err => {
  if (err) console.error(err);
});
