const fs = require('fs');

const filePath = './../../db/beers.json';

function readFromFile() {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const json = fs.readFileSync(filePath);
  return JSON.parse(json);
}

function writeToFile(beers) {
  const json = JSON.stringify(beers, null, 2);
  fs.writeFileSync(filePath, json);
}

module.exports = {
  readFromFile,
  writeToFile,
};
