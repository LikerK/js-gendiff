import _ from 'lodash';
import getContent from './parser.js';

const getDiff = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const commonKeys = _.union(keysData1, keysData2).sort();
  return commonKeys.reduce((acc, key) => {
    const [value1, value2] = [data1[key], data2[key]];
    if (key in data1 && !(key in data2)) {
      acc[`- ${key}`] = value1;
    } else if (value1 === value2) {
      acc[`  ${key}`] = value1;
    } else if (key in data2 && !(key in data1)) {
      acc[`+ ${key}`] = value2;
    } else if (key in data1 && key in data2) {
      acc[`- ${key}`] = value1;
      acc[`+ ${key}`] = value2;
    }
    return acc;
  }, {});
};

const getString = (data) => {
  const keys = Object.keys(data);
  const content = keys.map((key) => `  ${key}: ${data[key]}\n`);
  return ['{\n', ...content, '}'].join('');
};

export default (path1, path2) => {
  const [fileContent1, fileContent2] = getContent(path1, path2);
  const diff = getDiff(fileContent1, fileContent2);
  return getString(diff);
};
