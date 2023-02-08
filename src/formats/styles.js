import getPlain from './plain.js';
import getStylishFormat from './stylish.js';

const FORMATS = {
  stylish: getStylishFormat,
  plain: getPlain,
};

export default FORMATS;
