const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

module.exports.baseName = filename => {
  const ext = path.extname(filename);
  return path.basename(filename, ext);
};

module.exports.isJSON = (str) => {
  try {
    return (JSON5.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};
module.exports.writeFileAsync = async (path, text) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, 'utf8', text, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};
module.exports.writeFileSync = (path, text) => {
  return fs.writeFileSync(path, text);
};

module.exports.readFileAsync = async (path) =>  {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
const readFileSync = (path) => {
  return fs.readFileSync(path, 'utf8');
};
module.exports.readFileSync = readFileSync;

module.exports.readJsonAndParseSync = (path) => {
  return JSON5.parse(readFileSync(path));
};

module.exports.readJsonAndParseAsync = async (path) => {
  const json = await readFileSync(path);
  return JSON5.parse(json);
};

module.exports.existsSync = (path) => fs.existsSync(path);

module.exports.existsAsync = async (path) => {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        // TOOO add logger.error(err)
        resolve(false);
      }
      else resolve(true);
    });
  })
};

module.exports.readDirAsync = async (dirpath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirpath, 'utf8', (err, files) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
};

module.exports.readDirSync = (dirpath) => {
  return fs.readdirSync(dirpath, 'utf8');
};
