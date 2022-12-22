import { getContent } from '../src/parser.js';

const getDiff = (data1, data2) => {
    const result = {};
    const keysData1 = Object.keys(data1);
    const keysData2 = Object.keys(data2);
    const commonKeys = Array.from(new Set(keysData1.concat(keysData2))).sort();
    for (let key of commonKeys) {
        const [value1, value2] = [data1[key], data2[key]]
        if (key in data1 && !(key in data2)) {
            result['- ' + key] = value1;
        } else if (value1 === value2){
            result['  ' + key] = value1;
        } else if (key in data2 && !(key in data1)) {
            result['+ ' + key] = value2;
        } else if (key in data1 && key in data2) {
            result['- ' + key] = value1;
            result['+ ' + key] = value2;
        }
    }   
    return result;
};

const getString = (data) => {
    const result = ['{\n'];
    const keys = Object.keys(data);
    for (let key of keys) {
        const value = data[key];
        result.push(`  ${key}: ${value}\n`);
    }
    result.push('}');
    return result.join('');
}

export const genDiff = (path1, path2) => {
    const [fileContent1, fileContent2] = getContent(path1, path2)
    const diff = getDiff(fileContent1, fileContent2)
    return getString(diff);
}