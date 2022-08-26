import amqplib from 'amqplib';
import {v4} from 'uuid';

interface Dictionary<T> {
  [Key: string]: T;
}

enum QueueType {
  checkImage = 'check_image',
  checkImageResponse = 'check_image_res',
}

class Queue {
  private connection!: amqplib.Connection;
  private channel!: amqplib.Channel;
  private requests: Dictionary<
    (value: PromiseLike<boolean | undefined>) => void
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
    await this.channel.assertQueue(QueueType.checkImage);
    await this.channel.assertQueue(QueueType.checkImageResponse);

    this.channel.consume(QueueType.checkImageResponse, (msg) => {
      if (msg !== null) {
        const json = JSON.parse(msg.content.toString());
        console.log('Recieved:', json);
        this.channel.ack(msg);

        this.requests[json.id] && this.requests[json.id](json.response);
        delete this.requests[json.id];
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  };

  checkIfImagesExist = async (imageUrls: string[]) => {
    return new Promise<boolean>((resolve, reject) => {
      const id = v4();
      const data = {
        id,
        imageUrls,
      };

      this.channel.sendToQueue(
        QueueType.checkImage,
        Buffer.from(JSON.stringify(data)),
      );
      this.requests[id] = resolve;
    });
  };
}

export default new Queue();
