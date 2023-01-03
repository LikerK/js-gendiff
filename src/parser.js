import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { cwd } from 'process';
import { load } from 'js-yaml';

const parseJSONFiles = (path1, path2) => {
  const fileContent1 = JSON.parse(readFileSync(path1));
  const fileContent2 = JSON.parse(readFileSync(path2));
  return [fileContent1, fileContent2];
};

const parseYAMLFiles = (path1, path2) => {
  const fileContent1 = load(readFileSync(path1));
  const fileContent2 = load(readFileSync(path2));
  return [fileContent1, fileContent2];
};

export default (path1, path2) => {
  const FORMATS = {
    '.yml': parseYAMLFiles,
    '.yaml': parseYAMLFiles,
    '.json': parseJSONFiles,
  };
  const fullPathFile1 = resolve(cwd(), path1);
  const fullPathFile2 = resolve(cwd(), path2);
  return FORMATS[extname(path1)](fullPathFile1, fullPathFile2);
};
