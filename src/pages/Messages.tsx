import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  MessagesSquare,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { messageService } from "@/services/message.service";
import { Contact, Message } from "@/models/message.model";
import { ContactItem } from "@/components/ContactItem";
import { MessageItem } from "@/components/MessageItem";
import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type ChatFilter = "all" | "direct" | "groups" | "unread";

const EMOJIS = ["😀", "😅", "😍", "👍", "🙏", "🎉", "🔥", "📚", "✅", "❤️", "😢", "🤔"];

const Messages = () => {
  const { toast } = useToast();
  const contacts = messageService.getAllContacts();

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<ChatFilter>("all");
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [version, setVersion] = useState(0);

  // in-chat search
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [chatSearch, setChatSearch] = useState("");
  const [matchIndex, setMatchIndex] = useState(0);

  // typing simulation + unread divider
  const [isTyping, setIsTyping] = useState(false);
  const [unreadFrom, setUnreadFrom] = useState<string | null>(null);

  // forward dialog
  const [forwarding, setForwarding] = useState<Message | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const replyTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(replyTimer.current), []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // auto-grow composer
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [newMessage]);

  const totalUnread = useMemo(
    () => contacts.reduce((sum, c) => sum + c.unread, 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contacts, version]
  );

  const handleContactSelect = useCallback((contact: Contact) => {
    const list = messageService.getMessagesByContactId(contact.id);
    // remember where unread messages start before clearing the badge
    const incoming = list.filter((m) => !m.isOwn);
    const firstUnread =
      contact.unread > 0 ? incoming[Math.max(incoming.length - contact.unread, 0)]?.id ?? null : null;

    setSelectedContact(contact);
    setMessages(list);
    setUnreadFrom(firstUnread);
    messageService.markAsRead(contact.id);
    setReplyTo(null);
    setChatSearch("");
    setChatSearchOpen(false);
    setMobileChatOpen(true);
    setVersion((v) => v + 1);
  }, []);

  const sendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedContact) return;
    const contactId = selectedContact.id;
    const message = messageService.sendMessage(contactId, newMessage, replyTo);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    setReplyTo(null);
    setShowEmoji(false);
    setUnreadFrom(null);

    // demo auto-reply
    clearTimeout(replyTimer.current);
    setIsTyping(true);
    replyTimer.current = setTimeout(() => {
      const reply = messageService.createAutoReply(contactId);
      setIsTyping(false);
      if (!reply) return;
      setMessages((prev) => (prev.some((m) => m.id === reply.id) ? prev : [...prev, reply]));
      setVersion((v) => v + 1);
    }, 1800);
  }, [newMessage, selectedContact, replyTo]);

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

  const searchMatches = useMemo(() => {
    const q = chatSearch.trim().toLowerCase();
    if (!q) return [];
    return messages.filter((m) => m.content.toLowerCase().includes(q));
  }, [chatSearch, messages]);

  useEffect(() => setMatchIndex(0), [chatSearch]);

  const jumpToMatch = useCallback(
    (index: number) => {
      if (!searchMatches.length) return;
      const next = (index + searchMatches.length) % searchMatches.length;
      setMatchIndex(next);
      messageRefs.current[searchMatches[next].id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [searchMatches]
  );

  const pinnedMessages = useMemo(
    () => messages.filter((m) => m.pinned),
    [messages]
  );

  const toggleMute = () => {
    if (!selectedContact) return;
    messageService.toggleMute(selectedContact.id);
    setVersion((v) => v + 1);
  };

  const togglePin = () => {
    if (!selectedContact) return;
    messageService.togglePin(selectedContact.id);
    setVersion((v) => v + 1);
  };

  // ----- message actions -----
  const handleCopy = useCallback(
    (message: Message) => {
      navigator.clipboard?.writeText(message.content);
      toast({ title: "Copied", description: "Message text copied to clipboard." });
    },
    [toast]
  );

  const handleDelete = useCallback(
    (message: Message) => {
      if (!selectedContact) return;
      setMessages(messageService.deleteMessage(selectedContact.id, message.id));
      toast({ title: "Message deleted" });
    },
    [selectedContact, toast]
  );

  const handleTogglePinMessage = useCallback(
    (message: Message) => {
      if (!selectedContact) return;
      setMessages(messageService.toggleMessagePin(selectedContact.id, message.id));
    },
    [selectedContact]
  );

  const handleReact = useCallback(
    (message: Message, emoji: string) => {
      if (!selectedContact) return;
      setMessages(messageService.toggleReaction(selectedContact.id, message.id, emoji));
    },
    [selectedContact]
  );

  const handleForward = useCallback((targetId: string) => {
    if (!forwarding) return;
    messageService.forwardMessage(targetId, forwarding);
    setForwarding(null);
    setVersion((v) => v + 1);
    toast({ title: "Message forwarded" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forwarding, toast]);

  return (
    <MainLayout>
      <div className="h-[calc(100dvh-4rem)] p-0 sm:p-4 animate-fade-in">
        <Card className="h-full flex overflow-hidden shadow-elegant rounded-none sm:rounded-lg">
          {/* Chats Sidebar */}
          <aside
            className={cn(
              "w-full md:w-80 lg:w-96 border-r border-border flex-col flex-shrink-0 min-h-0",
              mobileChatOpen ? "hidden md:flex" : "flex"
            )}
          >
            <div className="p-3 sm:p-4 border-b border-border space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Messages</h2>
                {totalUnread > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                    {totalUnread} unread
                  </span>
                )}
              </div>
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

            <ScrollArea className="flex-1 min-h-0">
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
                      isSelected={selectedContact?.id === contact.id}
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
              "flex-1 flex-col min-w-0 min-h-0",
              mobileChatOpen ? "flex" : "hidden md:flex"
            )}
          >
            {!selectedContact ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 rounded-full bg-gradient-oxford flex items-center justify-center mb-5">
                  <MessagesSquare className="w-12 h-12 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Your conversations</h3>
                <p className="text-muted-foreground max-w-sm">
                  Pick a chat or a study group from the list to start messaging your teachers and
                  classmates.
                </p>
              </div>
            ) : (
              <>
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
                    <h3 className="font-semibold text-foreground truncate">
                      {selectedContact.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {isTyping || selectedContact.typing
                        ? "typing..."
                        : selectedContact.type === "group"
                        ? `${selectedContact.members} members`
                        : selectedContact.online
                        ? "Online"
                        : selectedContact.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setChatSearchOpen((s) => !s)}
                      aria-label="Search in conversation"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
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

                {/* In-chat search */}
                {chatSearchOpen && (
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-secondary/40">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        autoFocus
                        value={chatSearch}
                        onChange={(e) => setChatSearch(e.target.value)}
                        placeholder="Search in this conversation..."
                        className="pl-9 h-9"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {searchMatches.length ? `${matchIndex + 1}/${searchMatches.length}` : "0/0"}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => jumpToMatch(matchIndex - 1)} aria-label="Previous match">
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => jumpToMatch(matchIndex + 1)} aria-label="Next match">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setChatSearchOpen(false);
                        setChatSearch("");
                      }}
                      aria-label="Close search"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Pinned messages bar */}
                {pinnedMessages.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-accent/10">
                    <Pin className="w-4 h-4 text-accent flex-shrink-0" />
                    <button
                      type="button"
                      className="flex-1 min-w-0 text-left"
                      onClick={() =>
                        messageRefs.current[pinnedMessages[0].id]?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        })
                      }
                    >
                      <p className="text-xs font-medium text-foreground">
                        Pinned {pinnedMessages.length > 1 ? `(${pinnedMessages.length})` : ""}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {pinnedMessages[0].content}
                      </p>
                    </button>
                  </div>
                )}

                {/* Messages */}
                <ScrollArea className="flex-1 min-h-0">
                  <div className="py-4 space-y-2">
                    {messages.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-10">
                        No messages yet. Say hello 👋
                      </p>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message.id}
                          ref={(el) => (messageRefs.current[message.id] = el)}
                        >
                          {unreadFrom === message.id && (
                            <div className="flex items-center gap-2 px-4 my-3">
                              <span className="h-px flex-1 bg-accent/50" />
                              <span className="text-[11px] font-medium text-accent whitespace-nowrap">
                                New messages
                              </span>
                              <span className="h-px flex-1 bg-accent/50" />
                            </div>
                          )}
                          <MessageItem
                            message={message}
                            showSender={selectedContact.type === "group"}
                            highlight={chatSearch}
                            onReply={setReplyTo}
                            onCopy={handleCopy}
                            onDelete={handleDelete}
                            onForward={setForwarding}
                            onTogglePin={handleTogglePinMessage}
                            onReact={handleReact}
                          />
                        </div>
                      ))
                    )}

                    {isTyping && (
                      <div className="px-4">
                        <div className="inline-flex items-center gap-1 bg-secondary rounded-2xl rounded-bl-md px-3 py-2.5">
                          {[0, 150, 300].map((delay) => (
                            <span
                              key={delay}
                              className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                              style={{ animationDelay: `${delay}ms` }}
                            />
                          ))}
                        </div>
                      </div>
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

                    <Textarea
                      ref={textareaRef}
                      rows={1}
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      className="flex-1 min-w-0 resize-none min-h-[40px] max-h-[140px] py-2"
                    />
                    <Button
                      variant="gold"
                      size="icon"
                      onClick={sendMessage}
                      className="flex-shrink-0"
                      aria-label="Send"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </section>
        </Card>
      </div>

      {/* Forward dialog */}
      <Dialog open={!!forwarding} onOpenChange={(open) => !open && setForwarding(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Forward message</DialogTitle>
          </DialogHeader>
          <div className="max-h-80 overflow-y-auto space-y-1">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                type="button"
                onClick={() => handleForward(contact.id)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary text-left"
              >
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold",
                    contact.type === "group"
                      ? "bg-gradient-oxford text-primary-foreground"
                      : "bg-gradient-gold text-accent-foreground"
                  )}
                >
                  {contact.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{contact.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{contact.role}</p>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Messages;
