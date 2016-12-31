const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const results = [];

try {
  console.log('Removing comparisons.json file.');
  const dirPath = path.resolve('.', 'comparisons');
  const resultFilePath = path.resolve(dirPath, 'comparisons.json');
  if (fs.existsSync(resultFilePath)) {
      fs.unlinkSync(resultFilePath);
  }
  console.log('Parsing yaml files:');
  const fileNames = fs.readdirSync(dirPath);
  fileNames.forEach((fileName) => {
    console.log(`  - ${fileName}`);
    const filePath = path.resolve(dirPath, fileName);
    const file = fs.readFileSync(filePath, 'utf8');
    const document = yaml.safeLoad(file);
    results.push(document);
  });
  console.log('Saving to comparisons.json file.');
  
  fs.writeFileSync(resultFilePath, JSON.stringify(results));
  console.log('Finished successfully!');
} catch (e) {
  console.log(e);
}