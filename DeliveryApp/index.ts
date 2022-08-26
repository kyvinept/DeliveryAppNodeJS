import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import './src/extensions';
import {Model} from 'objection';
import connection from 'configs/knex';
import {listen} from './app';
import {initStorage} from 'storage';
import './src/queues';

const PORT = process.env.PORT;

Model.knex(connection);
initStorage();

const start = async () => {
  try {
    listen(PORT);
  } catch (e) {
    console.log(e);
  }
};

start();
