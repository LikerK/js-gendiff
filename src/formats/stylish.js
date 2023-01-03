import _ from 'lodash';

const VERTEX_TYPES = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};
const DEPTH = '  ';

const getStringValue = (value, depthLvl) => {
  if (_.isObject(value)) {
    const result = [];
    const keys = Object.keys(value);
    const indent = DEPTH.repeat(depthLvl + 2);
    keys.map((key) => result.push(
      `${indent}${VERTEX_TYPES.unchanged}${key}: `,
      `${getStringValue(value[key], depthLvl + 2)}\n`,
    ));
    return `{\n${result.join('')}${DEPTH.repeat(depthLvl + 1)}}`;
  }
  return value;
};
// '`=`' //
const stringifyNode = (keyNode, node, depthLvl) => {
  const result = [];
  const type = node.typeValue;
  const value = node.valueItem;
  const indent = DEPTH.repeat(depthLvl);
  if (type === 'nested') {
    const keys = Object.keys(value);
    result.push(`${indent}${VERTEX_TYPES.unchanged}${keyNode}: {`);
    const nodesString = keys.map((key) => stringifyNode(key, value[key], depthLvl + 2));
    result.push(`${nodesString.join('\n')}\n${DEPTH.repeat(depthLvl + 1)}}`);
  } else if (type === 'changed') {
    const [value1, value2] = value;
    const keyString1 = `${indent}${VERTEX_TYPES.removed}${keyNode}`;
    const keyString2 = `${indent}${VERTEX_TYPES.added}${keyNode}`;
    result.push(`${keyString1}: ${getStringValue(value1, depthLvl)}`);
    result.push(`${keyString2}: ${getStringValue(value2, depthLvl)}`);
  } else {
    const keyString = `${indent}${VERTEX_TYPES[type]}${keyNode}`;
    result.push(`${keyString}: ${getStringValue(value, depthLvl)}`);
  }
  return result.join('\n');
};

const getStylishFormat = (data) => {
  const keys = Object.keys(data);
  const nodesString = keys.map((key) => stringifyNode(key, data[key], 1));
  return `{\n${nodesString.join('\n')}\n}`;
};

export default getStylishFormat;
