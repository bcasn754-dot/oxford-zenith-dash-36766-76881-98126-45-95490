import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Send,
  Search,
  ArrowLeft,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  BellOff,
  Bell,
  Pin,
  PinOff,
  X,
  Image as ImageIcon,
  FileText,
  Camera,
  Users,
} from "lucide-react";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { messageService } from "@/services/message.service";
import { Contact, Message } from "@/models/message.model";
import { ContactItem } from "@/components/ContactItem";
import { MessageItem } from "@/components/MessageItem";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

type ChatFilter = "all" | "direct" | "groups" | "unread";

const EMOJIS = ["😀", "😅", "😍", "👍", "🙏", "🎉", "🔥", "📚", "✅", "❤️", "😢", "🤔"];

const Messages = () => {
  const contacts = messageService.getAllContacts();
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(
    messageService.getMessagesByContactId(contacts[0].id)
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<ChatFilter>("all");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [version, setVersion] = useState(0);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleContactSelect = useCallback((contact: Contact) => {
    setSelectedContact(contact);
    setMessages(messageService.getMessagesByContactId(contact.id));
    messageService.markAsRead(contact.id);
    setReplyTo(null);
    setMobileChatOpen(true);
    setVersion((v) => v + 1);
  }, []);

  const sendMessage = useCallback(() => {
    if (!newMessage.trim()) return;
    const message = messageService.sendMessage(selectedContact.id, newMessage, replyTo);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    setReplyTo(null);
    setShowEmoji(false);
  }, [newMessage, selectedContact.id, replyTo]);

  const filteredContacts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    return contacts
      .filter((contact) => {
        if (filter === "direct" && contact.type !== "direct") return false;
        if (filter === "groups" && contact.type !== "group") return false;
        if (filter === "unread" && contact.unread === 0) return false;
        if (!query) return true;
        return (
          contact.name.toLowerCase().includes(query) ||
          contact.role.toLowerCase().includes(query) ||
          contact.lastMessage.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, contacts, filter, version]);

  const toggleMute = () => {
    messageService.toggleMute(selectedContact.id);
    setVersion((v) => v + 1);
  };

  const togglePin = () => {
    messageService.togglePin(selectedContact.id);
    setVersion((v) => v + 1);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] p-2 sm:p-4 animate-fade-in">
        <Card className="h-full flex overflow-hidden shadow-elegant">
          {/* Chats Sidebar */}
          <aside
            className={cn(
              "w-full md:w-80 lg:w-96 border-r border-border flex-col flex-shrink-0",
              mobileChatOpen ? "hidden md:flex" : "flex"
            )}
          >
            <div className="p-3 sm:p-4 border-b border-border space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search chats..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {(["all", "direct", "groups", "unread"] as ChatFilter[]).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors border",
                      filter === f
                        ? "bg-accent text-accent-foreground border-accent"
                        : "bg-secondary text-muted-foreground border-transparent hover:text-foreground"
                    )}
                  >
                    {f === "all"
                      ? "All"
                      : f === "direct"
                      ? "Chats"
                      : f === "groups"
                      ? "Groups"
                      : "Unread"}
                  </button>
                ))}
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {filteredContacts.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm">
                    No chats found
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                    <ContactItem
                      key={contact.id}
                      contact={contact}
                      isSelected={selectedContact.id === contact.id}
                      onClick={handleContactSelect}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </aside>

          {/* Chat Area */}
          <section
            className={cn(
              "flex-1 flex-col min-w-0",
              mobileChatOpen ? "flex" : "hidden md:flex"
            )}
          >
            {/* Chat Header */}
            <header className="p-3 sm:p-4 border-b border-border flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden flex-shrink-0"
                onClick={() => setMobileChatOpen(false)}
                aria-label="Back to chats"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="relative flex-shrink-0">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                    selectedContact.type === "group"
                      ? "bg-gradient-oxford text-primary-foreground"
                      : "bg-gradient-gold text-accent-foreground"
                  )}
                >
                  {selectedContact.avatar}
                </div>
                {selectedContact.type === "direct" && selectedContact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-card" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-foreground truncate">{selectedContact.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {selectedContact.typing
                    ? "typing..."
                    : selectedContact.type === "group"
                    ? `${selectedContact.members} members`
                    : selectedContact.online
                    ? "Online"
                    : selectedContact.role}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Voice call">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Video call">
                  <Video className="w-4 h-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="Chat options">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover z-50">
                    <DropdownMenuItem onClick={toggleMute}>
                      {selectedContact.muted ? (
                        <>
                          <Bell className="w-4 h-4 mr-2" /> Unmute notifications
                        </>
                      ) : (
                        <>
                          <BellOff className="w-4 h-4 mr-2" /> Mute notifications
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={togglePin}>
                      {selectedContact.pinned ? (
                        <>
                          <PinOff className="w-4 h-4 mr-2" /> Unpin chat
                        </>
                      ) : (
                        <>
                          <Pin className="w-4 h-4 mr-2" /> Pin chat
                        </>
                      )}
                    </DropdownMenuItem>
                    {selectedContact.type === "group" && (
                      <DropdownMenuItem>
                        <Users className="w-4 h-4 mr-2" /> Group info
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Messages */}
            <ScrollArea className="flex-1">
              <div className="py-4 space-y-2">
                {messages.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-10">
                    No messages yet. Say hello 👋
                  </p>
                ) : (
                  messages.map((message) => (
                    <MessageItem
                      key={message.id}
                      message={message}
                      showSender={selectedContact.type === "group"}
                      onReply={setReplyTo}
                    />
                  ))
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            {/* Composer */}
            <div className="border-t border-border p-2 sm:p-4 space-y-2">
              {replyTo && (
                <div className="flex items-center gap-2 bg-secondary rounded-lg p-2">
                  <div className="border-l-2 border-accent pl-2 flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{replyTo.sender}</p>
                    <p className="text-xs text-muted-foreground truncate">{replyTo.content}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setReplyTo(null)} aria-label="Cancel reply">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {showEmoji && (
                <div className="flex flex-wrap gap-1 bg-secondary rounded-lg p-2">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="text-xl hover:scale-125 transition-transform"
                      onClick={() => setNewMessage((m) => m + emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-1 sm:gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="flex-shrink-0" aria-label="Attach">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-popover z-50">
                    <DropdownMenuItem>
                      <ImageIcon className="w-4 h-4 mr-2" /> Photo
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="w-4 h-4 mr-2" /> Document
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Camera className="w-4 h-4 mr-2" /> Camera
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 hidden sm:inline-flex"
                  onClick={() => setShowEmoji((s) => !s)}
                  aria-label="Emoji"
                >
                  <Smile className="w-4 h-4" />
                </Button>

                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="flex-1 min-w-0"
                />
                <Button variant="gold" size="icon" onClick={sendMessage} className="flex-shrink-0" aria-label="Send">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Messages;
