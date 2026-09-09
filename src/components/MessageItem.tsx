import { memo } from "react";
import { Message } from "@/models/message.model";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCheck,
  Reply,
  MoreVertical,
  Copy,
  Trash2,
  Forward,
  Pin,
  PinOff,
  Smile,
  CornerUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const REACTIONS = ["👍", "❤️", "😂", "🎉", "🙏"];

interface MessageItemProps {
  message: Message;
  showSender?: boolean;
  highlight?: string;
  onReply?: (message: Message) => void;
  onCopy?: (message: Message) => void;
  onDelete?: (message: Message) => void;
  onForward?: (message: Message) => void;
  onTogglePin?: (message: Message) => void;
  onReact?: (message: Message, emoji: string) => void;
}

/** Highlights the search query inside message text */
const HighlightedText = ({ text, query }: { text: string; query?: string }) => {
  if (!query?.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent text-accent-foreground rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

/**
 * Chat bubble with reply preview, reactions, delivery ticks and message actions
 */
export const MessageItem = memo(
  ({
    message,
    showSender,
    highlight,
    onReply,
    onCopy,
    onDelete,
    onForward,
    onTogglePin,
    onReact,
  }: MessageItemProps) => {
    const actions = (
      <div className="flex items-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {onReply && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground"
            onClick={() => onReply(message)}
            aria-label="Reply"
          >
            <Reply className="w-4 h-4" />
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground"
              aria-label="Message options"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={message.isOwn ? "end" : "start"} className="bg-popover z-50">
            {onReact && (
              <div className="flex items-center gap-1 px-2 py-1.5">
                {REACTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="text-lg hover:scale-125 transition-transform"
                    onClick={() => onReact(message, emoji)}
                    aria-label={`React ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
            <DropdownMenuSeparator />
            {onReply && (
              <DropdownMenuItem onClick={() => onReply(message)}>
                <Reply className="w-4 h-4 mr-2" /> Reply
              </DropdownMenuItem>
            )}
            {onCopy && (
              <DropdownMenuItem onClick={() => onCopy(message)}>
                <Copy className="w-4 h-4 mr-2" /> Copy text
              </DropdownMenuItem>
            )}
            {onForward && (
              <DropdownMenuItem onClick={() => onForward(message)}>
                <Forward className="w-4 h-4 mr-2" /> Forward
              </DropdownMenuItem>
            )}
            {onTogglePin && (
              <DropdownMenuItem onClick={() => onTogglePin(message)}>
                {message.pinned ? (
                  <>
                    <PinOff className="w-4 h-4 mr-2" /> Unpin message
                  </>
                ) : (
                  <>
                    <Pin className="w-4 h-4 mr-2" /> Pin message
                  </>
                )}
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem onClick={() => onDelete(message)} className="text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

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
            "group flex items-center gap-1",
            message.isOwn ? "justify-end" : "justify-start"
          )}
        >
          {message.isOwn && actions}
          <div
            className={cn(
              "relative max-w-[85%] sm:max-w-[70%] rounded-2xl px-3 py-2 shadow-sm",
              message.isOwn
                ? "bg-gradient-oxford text-primary-foreground rounded-br-md"
                : "bg-secondary text-foreground rounded-bl-md",
              message.reactions?.length ? "mb-3" : ""
            )}
          >
            {showSender && !message.isOwn && (
              <p className="text-xs font-semibold text-accent mb-1">{message.sender}</p>
            )}
            {(message.pinned || message.forwarded) && (
              <div
                className={cn(
                  "flex items-center gap-1 text-[10px] mb-1",
                  message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                {message.pinned && (
                  <span className="flex items-center gap-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
                {message.forwarded && (
                  <span className="flex items-center gap-1 italic">
                    <CornerUpRight className="w-3 h-3" /> Forwarded
                  </span>
                )}
              </div>
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
            <p className="text-sm break-words whitespace-pre-wrap">
              <HighlightedText text={message.content} query={highlight} />
            </p>
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

            {!!message.reactions?.length && (
              <div
                className={cn(
                  "absolute -bottom-3 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-card border border-border shadow-sm",
                  message.isOwn ? "right-2" : "left-2"
                )}
              >
                {message.reactions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="text-xs leading-none"
                    onClick={() => onReact?.(message, emoji)}
                    aria-label={`Remove reaction ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          {!message.isOwn && actions}
        </div>
      </div>
    );
  }
);

MessageItem.displayName = "MessageItem";

export const ReactionIcon = Smile;
