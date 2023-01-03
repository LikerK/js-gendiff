import _ from 'lodash';
import getContent from './parser.js';
import FORMATS from './formats/styles.js';

const getDiff = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const commonKeys = _.union(keysData1, keysData2).sort();
  return commonKeys.reduce((acc, key) => {
    const [value1, value2] = [data1[key], data2[key]];
    let type;
    let value;
    if (key in data1 && !(key in data2)) {
      type = 'removed';
      value = value1;
    } else if (value1 === value2) {
      type = 'unchanged';
      value = value1;
    } else if (key in data2 && !(key in data1)) {
      type = 'added';
      value = value2;
    } else if (_.isObject(value2) && _.isObject(value1)) {
      type = 'nested';
      value = getDiff(value1, value2);
    } else {
      type = 'changed';
      value = [value1, value2];
    }
    acc[key] = {
      typeValue: type,
      valueItem: value,
    };
    return acc;
  }, {});
};

const gendiff = (path1, path2, format) => {
  const [fileContent1, fileContent2] = getContent(path1, path2);
  const diff = getDiff(fileContent1, fileContent2);
  return FORMATS[format](diff);
};

export default gendiff;
