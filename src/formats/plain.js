import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const getPlain = (data) => {
  const iter = (node, parentKey = '') => node.flatMap(({ type, key, value }) => {
    const newParentKey = parentKey ? `${parentKey}.${key}` : `${key}`;
    switch (type) {
      case 'nested':
        return iter(value, newParentKey);
      case 'added':
        return `Property '${newParentKey}' was added with value: ${getValue(value)}`;
      case 'changed':
        return `Property '${newParentKey}' was updated. From ${getValue(value[0])} to ${getValue(value[1])}`;
      case 'removed':
        return `Property '${newParentKey}' was removed`;
      default:
        throw new Error(`Unknown type: '${type}'!`);
    }
  });

  return iter(data)
    .filter((item) => !!item === true)
    .join('\n');
};

export default getPlain;
