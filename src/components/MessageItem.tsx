import { memo } from "react";
import { Message } from "@/models/message.model";
import { cn } from "@/lib/utils";

interface MessageItemProps {
  message: Message;
}

/**
 * Optimized message item component for virtual scrolling
 * Memoized to prevent unnecessary re-renders
 */
export const MessageItem = memo(({ message }: MessageItemProps) => {
  return (
    <div className={cn("flex px-4", message.isOwn ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          message.isOwn
            ? "bg-gradient-oxford text-primary-foreground"
            : "bg-secondary text-foreground"
        )}
      >
        <p className="text-sm mb-1">{message.content}</p>
        <p
          className={cn(
            "text-xs",
            message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
          )}
        >
          {message.timestamp}
        </p>
      </div>
    </div>
  );
});

MessageItem.displayName = "MessageItem";
