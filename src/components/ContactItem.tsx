import { memo } from "react";
import { Contact } from "@/models/message.model";
import { cn } from "@/lib/utils";
import { BellOff, Pin, Users } from "lucide-react";

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: (contact: Contact) => void;
}

/**
 * Chat list row (direct chat or group) - memoized for list performance
 */
export const ContactItem = memo(({ contact, isSelected, onClick }: ContactItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onClick(contact)}
      className={cn(
        "w-full text-left flex items-center gap-3 p-3 rounded-xl transition-colors",
        isSelected ? "bg-accent/20" : "hover:bg-secondary"
      )}
    >
      <div className="relative flex-shrink-0">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold",
            contact.type === "group"
              ? "bg-gradient-oxford text-primary-foreground"
              : "bg-gradient-gold text-accent-foreground"
          )}
        >
          {contact.avatar}
        </div>
        {contact.type === "direct" && contact.online && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-card" />
        )}
        {contact.type === "group" && (
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center">
            <Users className="w-3 h-3 text-muted-foreground" />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-semibold text-foreground truncate flex-1">{contact.name}</h3>
          <span className="text-[11px] text-muted-foreground flex-shrink-0">{contact.timestamp}</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground truncate flex-1">
            {contact.typing ? (
              <span className="text-success">typing...</span>
            ) : (
              contact.lastMessage
            )}
          </p>
          {contact.pinned && <Pin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
          {contact.muted && <BellOff className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
          {contact.unread > 0 && (
            <span className="min-w-5 h-5 px-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center flex-shrink-0">
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
});

ContactItem.displayName = "ContactItem";
