import 'dotenv/config';

export default {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
  },
  testing: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.TESTING_DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
