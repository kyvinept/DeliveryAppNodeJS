import ApiError from 'errors/ApiError';
import strings from 'strings';
import {injectable} from 'tsyringe';
import MessageRepository from 'repositories/messageRepository';
import ChatRepository from 'repositories/chatRepository';

@injectable()
class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private chatRepository: ChatRepository,
  ) {}

  getAll = async (
    page: number,
    perPage: number,
    userId: number,
    chatId: number,
  ) => {
    const chat = await this.chatRepository.findOneByCondition({id: chatId});
    if (!chat) {
      throw ApiError.notFound(strings.chat.notFound);
    }

    if (!(chat.owner_id == userId || chat.user_id == userId)) {
      throw ApiError.forbidden();
    }

    const messages = await this.messageRepository.getAllWithPagination({
      page,
      perPage,
      whereModel: {
        chat_id: chatId,
      },
    });

    return messages;
  };
}

export default MessageService;
