import * as Minio from 'minio';

const configs = {
  dev: {
    endPoint: process.env.MINIO_END_POINT_DEV,
    port: parseInt(process.env.MINIO_PORT_DEV),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY_DEV,
    secretKey: process.env.MINIO_SECRET_KEY_DEV,
  },
  test: {
    endPoint: process.env.MINIO_END_POINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  },
};

const client = new Minio.Client(
  process.env.NODE_ENV == 'testing' ? configs.test : configs.dev,
);

const createBucketIfNeeded = async () => {
  try {
    const bucketList = await client.listBuckets();
    console.log('bucketList', bucketList);
    for (const item of bucketList) {
      if (item.name == process.env.BUCKET_NAME) {
        return;
      }
    }

    await client.makeBucket(process.env.BUCKET_NAME, 'us-east-1');
  } catch (e) {
    console.log('createBucketIfNeeded error', e);
  }
};

createBucketIfNeeded();

export default client;
