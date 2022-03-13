import knex from 'knex';
import knexfile from '../../knexfile';

const connection = knex(
  process.env.NODE_ENV == 'testing' ? knexfile.testing : knexfile.development,
);

export default connection;
