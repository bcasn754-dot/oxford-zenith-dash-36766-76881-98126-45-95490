import { memo } from "react";
import { Message } from "@/models/message.model";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, Reply } from "lucide-react";

interface MessageItemProps {
  message: Message;
  showSender?: boolean;
  onReply?: (message: Message) => void;
}

/**
 * Chat bubble with reply preview, delivery ticks and group sender name
 */
export const MessageItem = memo(({ message, showSender, onReply }: MessageItemProps) => {
  return (
    <div className="px-2 sm:px-4">
      {message.dayLabel && (
        <div className="flex justify-center my-3">
          <span className="text-[11px] px-3 py-1 rounded-full bg-secondary text-muted-foreground">
            {message.dayLabel}
          </span>
        </div>
      )}
      <div
        className={cn(
          "group flex items-center gap-2",
          message.isOwn ? "justify-end" : "justify-start"
        )}
      >
        {message.isOwn && onReply && (
          <button
            type="button"
            onClick={() => onReply(message)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
            aria-label="Reply"
          >
            <Reply className="w-4 h-4" />
          </button>
        )}
        <div
          className={cn(
            "max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 py-2 shadow-sm",
            message.isOwn
              ? "bg-gradient-oxford text-primary-foreground rounded-br-md"
              : "bg-secondary text-foreground rounded-bl-md"
          )}
        >
          {showSender && !message.isOwn && (
            <p className="text-xs font-semibold text-accent mb-1">{message.sender}</p>
          )}
          {message.replyTo && (
            <div
              className={cn(
                "mb-1.5 border-l-2 pl-2 py-1 rounded text-xs",
                message.isOwn
                  ? "border-accent bg-primary-foreground/10 text-primary-foreground/80"
                  : "border-accent bg-background/60 text-muted-foreground"
              )}
            >
              <p className="font-medium">{message.replyTo.sender}</p>
              <p className="truncate">{message.replyTo.content}</p>
            </div>
          )}
          <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
          <div
            className={cn(
              "flex items-center gap-1 justify-end mt-1",
              message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            <span className="text-[10px]">{message.timestamp}</span>
            {message.isOwn &&
              (message.status === "read" ? (
                <CheckCheck className="w-3.5 h-3.5 text-accent" />
              ) : message.status === "delivered" ? (
                <CheckCheck className="w-3.5 h-3.5" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              ))}
          </div>
        </div>
        {!message.isOwn && onReply && (
          <button
            type="button"
            onClick={() => onReply(message)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
            aria-label="Reply"
          >
            <Reply className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
});

MessageItem.displayName = "MessageItem";
