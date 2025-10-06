export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}
