import amqplib from 'amqplib';
import {v4} from 'uuid';

interface Dictionary<T> {
  [Key: string]: T;
}

enum QueueType {
  checkAuth = 'check_auth',
  checkAuthResponse = 'check_auth_res',
}

class Queue {
  private connection!: amqplib.Connection;
  private channel!: amqplib.Channel;
  private requests: Dictionary<
    (value: PromiseLike<Object | undefined>) => void
  > = {};

  constructor() {
    this.initQueue();
  }

  private initQueue = async () => {
    this.connection = await amqplib.connect(process.env.RABBITMQ_URL ?? '');
    this.channel = await this.connection.createChannel();

    this.consumeQueueToCheckAuth();
  };

  consumeQueueToCheckAuth = async () => {
    await this.channel.assertQueue(QueueType.checkAuth);
    await this.channel.assertQueue(QueueType.checkAuthResponse);

    this.channel.consume(QueueType.checkAuthResponse, (msg) => {
      if (msg !== null) {
        const json = JSON.parse(msg.content.toString());
        console.log('Recieved:', json);
        this.channel.ack(msg);

        this.requests[json.id](json.user);
        delete this.requests[json.id];
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  };

  checkToken = async (token?: string) => {
    return new Promise<Object>((resolve, reject) => {
      if (!token) {
        return resolve(false);
      }

      const id = v4();
      const data = {
        id,
        token,
      };

      this.channel.sendToQueue(
        QueueType.checkAuth,
        Buffer.from(JSON.stringify(data)),
      );
      this.requests[id] = resolve;
    });
  };
}

export default new Queue();
