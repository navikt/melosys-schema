const fs = require('fs');
const zipdir = require('zip-dir');

const SCHEMA_DIR = `${process.cwd()}/schema`;
const LIB_DIR = `${process.cwd()}/lib`;
const version = `${process.env.npm_package_version}`;
const name = `${process.env.npm_package_name}`;

const createLibDirIfnotExists = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir);
createLibDirIfnotExists(LIB_DIR);

zipdir(SCHEMA_DIR, { saveTo: `${LIB_DIR}/${name}-${version}.zip` }, err => {
  if (err) console.error(err);
});
