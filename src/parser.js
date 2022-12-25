import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';

export default (path1, path2) => {
  const fullPathFile1 = resolve(cwd(), path1);
  const fullPathFile2 = resolve(cwd(), path2);
  const fileContent1 = JSON.parse(readFileSync(fullPathFile1));
  const fileContent2 = JSON.parse(readFileSync(fullPathFile2));
  return [fileContent1, fileContent2];
};
