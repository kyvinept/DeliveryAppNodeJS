import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import './src/extensions';
import {Model} from 'objection';
import connection from 'configs/knex';
import {listen} from './app';
import {initStorage} from 'storage';

const PORT = process.env.PORT;

Model.knex(connection);
initStorage();

const start = async () => {
  try {
    listen(PORT);
    console.log(
      'env',
      process.env.JWT_ACCESS_SECRET,
      process.env.JWT_REFRESH_SECRET,
    );
  } catch (e) {
    console.log(e);
  }
};

start();
