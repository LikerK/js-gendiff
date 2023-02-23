import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/engine.js';

const FILE_JSON1 = 'file1.json';
const FILE_JSON2 = 'file2.json';
const FILE_YAML1 = 'file1.yaml';
const FILE_YAML2 = 'file2.yaml';
const EXPECTED_FILE = 'expected_file';
const STYLISH_FORMAT = 'stylish';
// '`=`' //
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('stylish', () => {
  const file1 = getFixturePath(FILE_JSON1);
  const file2 = getFixturePath(FILE_JSON2);
  const expected = readFile(EXPECTED_FILE);
  expect(gendiff(file1, file2, STYLISH_FORMAT)).toBe(expected);
});

test('yaml', () => {
  const file1 = getFixturePath(FILE_YAML1);
  const file2 = getFixturePath(FILE_YAML2);
  const expected = readFile(EXPECTED_FILE);
  expect(gendiff(file1, file2, STYLISH_FORMAT)).toBe(expected);
});

test('json', () => {
  expect(() => JSON.parse(gendiff(getFixturePath(FILE_JSON1), getFixturePath(FILE_JSON2), 'json'))).not.toThrow();
  expect(() => JSON.parse(gendiff(getFixturePath(FILE_YAML1), getFixturePath(FILE_YAML2), 'json'))).not.toThrow();
});
