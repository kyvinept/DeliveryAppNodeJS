import {createClient} from 'redis';

const client = createClient({
  url:
    process.env.NODE_ENV == 'testing'
      ? process.env.TESTING_REDIS_URL
      : process.env.REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

export const initStorage = async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
};

export default client;
