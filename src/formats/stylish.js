import _ from 'lodash';

const REPLACER = '  ';
const ADDED = '+';
const REMOVE = '-';

const makeReplaces = (depth) => `${REPLACER.repeat((2 * depth - 1))}`;

const makeString = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const result = Object.entries(data).map(([key, value]) => `${makeReplaces(depth + 1)}  ${key}: ${makeString(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${makeReplaces(depth)}  }`;
};

const getString = (key, value, depth, symbol = ' ') => `${makeReplaces(depth)}${symbol} ${key}: ${makeString(value, depth)}`;

const getStylishFormat = (data) => {
  const iter = (nodes, depth) => nodes.map(({ key, type, value }) => {
    switch (type) {
      case 'nested':
        return [
          `${makeReplaces(depth)}  ${key}: {`,
          iter(value, depth + 1),
          `${makeReplaces(depth)}  }`,
        ];
      case 'added':
        return getString(key, value, depth, ADDED);
      case 'removed':
        return getString(key, value, depth, REMOVE);
      case 'changed':
        return [
          `${getString(key, value[0], depth, REMOVE)}`,
          `${getString(key, value[1], depth, ADDED)}`,
        ].join('\n');
      default:
        return getString(key, value, depth);
    }
  });
  const result = iter(data, 1).flat(Infinity);
  return `{\n${result.join('\n')}\n}`;
};

export default getStylishFormat;
