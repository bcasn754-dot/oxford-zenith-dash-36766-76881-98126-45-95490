export type ChatType = "direct" | "group";

export type MessageStatus = "sent" | "delivered" | "read";

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  type: ChatType;
  members?: number;
  online?: boolean;
  muted?: boolean;
  pinned?: boolean;
  typing?: boolean;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  status?: MessageStatus;
  replyTo?: { sender: string; content: string } | null;
  dayLabel?: string;
  reactions?: string[];
  pinned?: boolean;
  forwarded?: boolean;
}
