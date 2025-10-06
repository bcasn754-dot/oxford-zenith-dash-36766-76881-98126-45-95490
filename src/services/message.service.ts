import { Contact, Message } from "@/models/message.model";

// Mock data - can be easily replaced with API calls later
const contactsData: Contact[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    role: "Teacher",
    avatar: "S",
    lastMessage: "Great progress on your last assignment!",
    timestamp: "2 hours ago",
    unread: 2,
  },
  {
    id: "2",
    name: "Prof. Michael Brown",
    role: "Teacher",
    avatar: "M",
    lastMessage: "Your essay submission was excellent",
    timestamp: "1 day ago",
    unread: 0,
  },
  {
    id: "3",
    name: "Support Team",
    role: "Admin",
    avatar: "LT",
    lastMessage: "How can we help you today?",
    timestamp: "3 days ago",
    unread: 0,
  },
];

const messagesData: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      sender: "Dr. Sarah Johnson",
      content: "Hello Alex! How are you finding the current module?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      sender: "You",
      content: "Hi Dr. Johnson! I'm really enjoying it. The modal verbs lesson was very helpful.",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: "3",
      sender: "Dr. Sarah Johnson",
      content: "That's wonderful to hear! Great progress on your last assignment!",
      timestamp: "10:37 AM",
      isOwn: false,
    },
    {
      id: "4",
      sender: "Dr. Sarah Johnson",
      content: "Don't forget about the upcoming mid-term exam on October 15th.",
      timestamp: "10:38 AM",
      isOwn: false,
    },
  ],
};

class MessageService {
  // Get all contacts
  getAllContacts(): Contact[] {
    return contactsData;
  }

  // Get contact by ID
  getContactById(id: string): Contact | undefined {
    return contactsData.find((contact) => contact.id === id);
  }

  // Get messages for a contact
  getMessagesByContactId(contactId: string): Message[] {
    return messagesData[contactId] || [];
  }

  // Send a message (for future use with API)
  sendMessage(contactId: string, content: string): Message {
    const newMessage: Message = {
      id: String(Date.now()),
      sender: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    if (!messagesData[contactId]) {
      messagesData[contactId] = [];
    }
    messagesData[contactId].push(newMessage);

    return newMessage;
  }

  // Mark messages as read (for future use with API)
  markAsRead(contactId: string): void {
    const contact = contactsData.find((c) => c.id === contactId);
    if (contact) {
      contact.unread = 0;
    }
  }

  // Get unread count
  getUnreadCount(): number {
    return contactsData.reduce((sum, contact) => sum + contact.unread, 0);
  }
}

export const messageService = new MessageService();
