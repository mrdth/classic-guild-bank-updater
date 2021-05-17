import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import config from './Config';
import FileParser from './FileParser';

config.loadFromEnv();

const shouldSubmit = async (exportStrings: string[]): Promise<boolean> => {
  const data = await readFile(path.join(__dirname, '/../cache.json'), 'binary');
  return data !== JSON.stringify(exportStrings);
};

const updateCache = async (data: string[]) => {
  await writeFile(path.join(__dirname, '/../cache.json'), JSON.stringify(data));
};

const run = async () => {
  const fileParser = new FileParser(config.get('savedVariablesPath'));
  const exportStrings = await fileParser.parse();
  if (await shouldSubmit(exportStrings)) {
    updateCache(exportStrings);
    console.log('submitting');
  } else {
    console.log('not submitting');
  }
};

run();
console.log('done');
