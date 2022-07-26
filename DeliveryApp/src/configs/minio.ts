import * as Minio from 'minio';

const client = new Minio.Client({
  endPoint: process.env.MINIO_END_POINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

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
