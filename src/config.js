import { readFileSync } from 'fs';
import { root } from './oak';

const get = function get(object, property) {
    if (typeof object !== 'object')
        return undefined;

    const [ key, propertyPart ] = property.split('.', 2);

    if (!object[key])
        return undefined;

    if (!propertyPart)
        return object[key];

    return get(object[key], propertyPart);
};

const rootFolder = root();
const configFolder = `${rootFolder}/config`;
const configData = JSON.parse(readFileSync(`${configFolder}/default.json`, 'utf8'));

export default (property) => get(configData, property);
