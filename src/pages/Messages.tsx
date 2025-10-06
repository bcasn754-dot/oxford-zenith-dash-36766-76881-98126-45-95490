import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { messageService } from "@/services/message.service";
import { Contact } from "@/models/message.model";
import { useDebounce } from "@/hooks/use-debounce";

const Messages = () => {
  const contacts = messageService.getAllContacts();
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState(messageService.getMessagesByContactId(contacts[0].id));
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setMessages(messageService.getMessagesByContactId(contact.id));
    messageService.markAsRead(contact.id);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = messageService.sendMessage(selectedContact.id, newMessage);
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  // Filter contacts based on debounced search
  const filteredContacts = useMemo(() => {
    if (!debouncedSearch.trim()) return contacts;
    
    const query = debouncedSearch.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.role.toLowerCase().includes(query) ||
        contact.lastMessage.toLowerCase().includes(query)
    );
  }, [debouncedSearch, contacts]);

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] p-4 animate-fade-in">
        <Card className="h-full flex overflow-hidden shadow-elegant">
          {/* Contacts Sidebar */}
          <div className="w-80 border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredContacts.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No contacts found
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedContact.id === contact.id
                        ? "bg-accent/20"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-semibold text-accent-foreground flex-shrink-0">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground truncate">
                          {contact.name}
                        </h3>
                        {contact.unread > 0 && (
                          <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{contact.role}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {contact.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{contact.timestamp}</p>
                    </div>
                  </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-semibold text-accent-foreground">
                {selectedContact.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{selectedContact.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedContact.role}</p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isOwn
                          ? "bg-gradient-oxford text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      <p className="text-sm mb-1">{message.content}</p>
                      <p className={`text-xs ${message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button variant="gold" size="icon" onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Messages;
