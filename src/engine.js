import _ from 'lodash';
import getContent from './parser.js';
import FORMATS from './formats/styles.js';

const getDiff = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const commonKeys = _.union(keysData1, keysData2).sort();
  return commonKeys.map((item) => {
    const [value1, value2] = [data1[item], data2[item]];
    if (item in data1 && !(item in data2)) {
      return { key: item, type: 'removed', value: value1 };
    }
    if (value1 === value2) {
      return { key: item, type: 'unchanged', value: value1 };
    }
    if (item in data2 && !(item in data1)) {
      return { key: item, type: 'added', value: value2 };
    }
    if (_.isObject(value2) && _.isObject(value1)) {
      return { key: item, type: 'nested', value: getDiff(value1, value2) };
    }
    return { key: item, type: 'changed', value: [value1, value2] };
  });
};

const gendiff = (path1, path2, format) => {
  const [fileContent1, fileContent2] = getContent(path1, path2);
  const diff = getDiff(fileContent1, fileContent2);
  return FORMATS[format](diff);
};

export default gendiff;
