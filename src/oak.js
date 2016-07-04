import koa from 'koa';
import path from 'path';

export const root = () => {
    const [ rootFolder ] = __dirname.split(`${path.sep}node_modules${path.sep}`, 2);
    if (!rootFolder) {
        throw 'Could not find root folder';
    }
    return rootFolder;
};

export default (callback) => callback(koa());
