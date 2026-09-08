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
    type: "direct",
    online: true,
    pinned: true,
  },
  {
    id: "2",
    name: "Prof. Michael Brown",
    role: "Teacher",
    avatar: "M",
    lastMessage: "Your essay submission was excellent",
    timestamp: "1 day ago",
    unread: 0,
    type: "direct",
    online: false,
  },
  {
    id: "3",
    name: "Support Team",
    role: "Admin",
    avatar: "LT",
    lastMessage: "How can we help you today?",
    timestamp: "3 days ago",
    unread: 0,
    type: "direct",
    online: true,
  },
  {
    id: "g1",
    name: "Level B1 - Speaking Club",
    role: "24 members",
    avatar: "B1",
    lastMessage: "Emma: See you all at 7 PM!",
    timestamp: "10 min ago",
    unread: 5,
    type: "group",
    members: 24,
    pinned: true,
    typing: true,
  },
  {
    id: "g2",
    name: "Business English Group",
    role: "12 members",
    avatar: "BE",
    lastMessage: "Ahmed: Thanks for the notes 🙏",
    timestamp: "Yesterday",
    unread: 0,
    type: "group",
    members: 12,
    muted: true,
  },
  {
    id: "g3",
    name: "IELTS Preparation 2026",
    role: "38 members",
    avatar: "IE",
    lastMessage: "Teacher: Mock test on Friday",
    timestamp: "2 days ago",
    unread: 1,
    type: "group",
    members: 38,
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
      dayLabel: "Yesterday",
    },
    {
      id: "2",
      sender: "You",
      content: "Hi Dr. Johnson! I'm really enjoying it. The modal verbs lesson was very helpful.",
      timestamp: "10:35 AM",
      isOwn: true,
      status: "read",
    },
    {
      id: "3",
      sender: "Dr. Sarah Johnson",
      content: "That's wonderful to hear! Great progress on your last assignment!",
      timestamp: "10:37 AM",
      isOwn: false,
      dayLabel: "Today",
    },
    {
      id: "4",
      sender: "Dr. Sarah Johnson",
      content: "Don't forget about the upcoming mid-term exam on October 15th.",
      timestamp: "10:38 AM",
      isOwn: false,
    },
  ],
  "2": [
    {
      id: "1",
      sender: "Prof. Michael Brown",
      content: "Your essay submission was excellent, keep it up!",
      timestamp: "09:12 AM",
      isOwn: false,
      dayLabel: "Yesterday",
    },
  ],
  "3": [
    {
      id: "1",
      sender: "Support Team",
      content: "How can we help you today?",
      timestamp: "08:00 AM",
      isOwn: false,
      dayLabel: "Monday",
    },
  ],
  g1: [
    {
      id: "1",
      sender: "Emma",
      content: "Hi everyone! Ready for tonight's speaking session?",
      timestamp: "06:02 PM",
      isOwn: false,
      dayLabel: "Today",
    },
    {
      id: "2",
      sender: "Yusuf",
      content: "Yes! I prepared a short topic about travelling.",
      timestamp: "06:05 PM",
      isOwn: false,
    },
    {
      id: "3",
      sender: "You",
      content: "Great, I'll join from my laptop.",
      timestamp: "06:07 PM",
      isOwn: true,
      status: "delivered",
      replyTo: { sender: "Yusuf", content: "Yes! I prepared a short topic about travelling." },
    },
    {
      id: "4",
      sender: "Emma",
      content: "See you all at 7 PM!",
      timestamp: "06:10 PM",
      isOwn: false,
    },
  ],
  g2: [
    {
      id: "1",
      sender: "Ahmed",
      content: "Thanks for the notes 🙏",
      timestamp: "04:20 PM",
      isOwn: false,
      dayLabel: "Yesterday",
    },
  ],
  g3: [
    {
      id: "1",
      sender: "Teacher",
      content: "Mock test on Friday, please review units 3 and 4.",
      timestamp: "11:00 AM",
      isOwn: false,
      dayLabel: "Monday",
    },
  ],
};

class MessageService {
  // Get all contacts
  getAllContacts(): Contact[] {
    return contactsData;
  }

  getDirectChats(): Contact[] {
    return contactsData.filter((c) => c.type === "direct");
  }

  getGroupChats(): Contact[] {
    return contactsData.filter((c) => c.type === "group");
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
  sendMessage(contactId: string, content: string, replyTo?: Message | null): Message {
    const newMessage: Message = {
      id: String(Date.now()),
      sender: "You",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
      replyTo: replyTo ? { sender: replyTo.sender, content: replyTo.content } : null,
    };

    if (!messagesData[contactId]) {
      messagesData[contactId] = [];
    }
    messagesData[contactId].push(newMessage);

    const contact = this.getContactById(contactId);
    if (contact) {
      contact.lastMessage = content;
      contact.timestamp = "Just now";
    }

    return newMessage;
  }

  // Mark messages as read (for future use with API)
  markAsRead(contactId: string): void {
    const contact = contactsData.find((c) => c.id === contactId);
    if (contact) {
      contact.unread = 0;
    }
  }

  toggleMute(contactId: string): void {
    const contact = this.getContactById(contactId);
    if (contact) contact.muted = !contact.muted;
  }

  togglePin(contactId: string): void {
    const contact = this.getContactById(contactId);
    if (contact) contact.pinned = !contact.pinned;
  }

  // Get unread count
  getUnreadCount(): number {
    return contactsData.reduce((sum, contact) => sum + contact.unread, 0);
  }
}

export const messageService = new MessageService();
