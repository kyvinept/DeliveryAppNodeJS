import amqplib from 'amqplib';
import {checkAuthorization} from 'middleware/authMiddleware';

enum QueueType {
  checkAuth = 'check_auth',
  checkAuthResponse = 'check_auth_res',
}

class RabbitMQ {
  private connection: amqplib.Connection;
  private channel: amqplib.Channel;

  constructor() {
    setTimeout(() => {
      console.log('init rabbitmq');
      this.initQueue();
    }, 30000);
  }

  private initQueue = async () => {
    this.connection = await amqplib.connect(process.env.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();

    this.consumeQueueToCheckAuth();
  };

  consumeQueueToCheckAuth = async () => {
    await this.channel.assertQueue(QueueType.checkAuth);
    await this.channel.assertQueue(QueueType.checkAuthResponse);

    this.channel.consume(QueueType.checkAuth, (msg) => {
      if (msg !== null) {
        const json = JSON.parse(msg.content.toString());

        this.channel.ack(msg);

        let user: Object = undefined;
        try {
          user = checkAuthorization(json.token);
        } catch (err) {}

        const response = {
          id: json.id,
          user,
        };

        this.channel.sendToQueue(
          QueueType.checkAuthResponse,
          Buffer.from(JSON.stringify(response)),
        );
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  };
}

export default new RabbitMQ();
