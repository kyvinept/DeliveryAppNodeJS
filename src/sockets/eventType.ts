export enum OnEventType {
  connection = 'connection',
  subscribeToChat = 'subscribe_to_chat',
  unsubscribeFromChat = 'unsubscribe_from_chat',
  disconnect = 'disconnect',
}

export enum EmitEventType {
  inform = 'inform',
  error = 'error',
}

export enum CommonEventType {
  messageCreate = 'message:create',
  messageEdit = 'message:edit',
  messageDelete = 'message:delete',
}
