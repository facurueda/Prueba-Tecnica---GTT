export interface Chat {
  id: string;
  contact: {name: string; lastName: string; id: string};
  lastMessage: string;
  lastMessageTime: string;
  image: string;
}
