import config from './config.js';
import Knex from 'knex';
import { Model } from 'objection';

// init connection
var knex = Knex({
    client: 'mysql2',
    connection: {
        host:     config('database.host'),
        user:     config('database.user'),
        password: config('database.pass'),
        database: config('database.name')
    }
});
Model.knex(knex);

export { Model };
