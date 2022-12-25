import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/diff.js';

const FILE1 = 'file1.json';
const FILE2 = 'file2.json';
const EXPECTED_FILE = 'expected_file';
// '`=`' //
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  const path1 = getFixturePath(FILE1);
  const path2 = getFixturePath(FILE2);
  const expected = readFile(EXPECTED_FILE);
  expect(gendiff(path1, path2)).toBe(expected);
});
