import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import { load } from 'js-yaml';

const parseJSONFiles = (file1, file2) => [JSON.parse(file1), JSON.parse(file2)];

const parseYAMLFiles = (file1, file2) => [load(file1), load(file2)];

export default (path1, path2) => {
  const FORMATS = {
    '.yml': parseYAMLFiles,
    '.yaml': parseYAMLFiles,
    '.json': parseJSONFiles,
  };
  const fullPathFile1 = resolve(cwd(), path1);
  const fullPathFile2 = resolve(cwd(), path2);
  const readFile1 = readFileSync(fullPathFile1);
  const readFile2 = readFileSync(fullPathFile2);
  return FORMATS[extname(path1)](readFile1, readFile2);
};
