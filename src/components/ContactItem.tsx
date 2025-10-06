import { memo } from "react";
import { Contact } from "@/models/message.model";
import { cn } from "@/lib/utils";

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onClick: (contact: Contact) => void;
}

/**
 * Optimized contact item component for virtual scrolling
 * Memoized to prevent unnecessary re-renders
 */
export const ContactItem = memo(({ contact, isSelected, onClick }: ContactItemProps) => {
  return (
    <div
      onClick={() => onClick(contact)}
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        isSelected ? "bg-accent/20" : "hover:bg-secondary"
      )}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-semibold text-accent-foreground flex-shrink-0">
        {contact.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-foreground truncate">{contact.name}</h3>
          {contact.unread > 0 && (
            <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
              {contact.unread}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mb-1">{contact.role}</p>
        <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
        <p className="text-xs text-muted-foreground mt-1">{contact.timestamp}</p>
      </div>
    </div>
  );
});

ContactItem.displayName = "ContactItem";
