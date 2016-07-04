import compose  from 'koa-compose';
import Router   from 'koa-router';
import { action } from './controller.js';

var router = Router();

export default (config) => {
    config(router, action);
    return compose([
        router.routes(),
        router.allowedMethods()
    ]);
};
