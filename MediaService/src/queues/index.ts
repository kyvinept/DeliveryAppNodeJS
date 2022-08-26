import amqplib from 'amqplib';
import ImageService from 'services/imageService';
import {container, injectable} from 'tsyringe';

enum QueueType {
  checkImage = 'check_image',
  checkImageResponse = 'check_image_res',
}

@injectable()
class Queue {
  private connection!: amqplib.Connection;
  private channel!: amqplib.Channel;

  constructor(private imageService: ImageService) {
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

    this.channel.consume(QueueType.checkImage, async (msg) => {
      if (msg !== null) {
        const json = JSON.parse(msg.content.toString());
        console.log('Recieved:', json);
        this.channel.ack(msg);

        if (json.imageUrls) {
          this.channel.sendToQueue(
            QueueType.checkImageResponse,
            Buffer.from(
              JSON.stringify({
                id: json.id,
                response: await this.imageService.checkIfImagesExist(
                  json.imageUrls,
                ),
              }),
            ),
          );
        }
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  };
}

const queueInstance = container.resolve(Queue);

export default queueInstance;
