export interface MessageCreateModel {
  message: string;
  chat_id: number;
  date: Date;
}

export interface MessageEditModel {
  id: number;
  message: string;
}

export interface MessageDeleteModel {
  id: number;
}
