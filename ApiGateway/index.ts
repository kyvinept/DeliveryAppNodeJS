import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import {listen} from './app';

const PORT = process.env.PORT || '';

const start = async () => {
  try {
    listen(PORT);
  } catch (e) {
    console.log(e);
  }
};

start();
