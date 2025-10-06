import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Hand, 
  PhoneOff, 
  MessageSquare,
  Users,
  Send
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const students = [
  { id: 1, name: "Alex Johnson", status: "active", avatar: "A" },
  { id: 2, name: "Maria Garcia", status: "active", avatar: "M" },
  { id: 3, name: "John Smith", status: "inactive", avatar: "J" },
  { id: 4, name: "Sarah Lee", status: "active", avatar: "S" },
  { id: 5, name: "David Kim", status: "active", avatar: "D" },
];

const initialMessages = [
  { id: 1, user: "Teacher", message: "Welcome to today's class!", time: "10:00 AM" },
  { id: 2, user: "Maria", message: "Good morning!", time: "10:01 AM" },
  { id: 3, user: "Alex", message: "Hello everyone", time: "10:01 AM" },
];

const LiveClass = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showChat, setShowChat] = useState(true);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          message: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] p-4 flex gap-4 animate-fade-in">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Video Player */}
          <div className="flex-1 bg-gradient-oxford rounded-xl overflow-hidden shadow-elegant relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-primary-foreground">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Live Class: Business English Communication</p>
                <p className="text-sm opacity-75 mt-2">Teacher: Dr. Sarah Johnson</p>
                <Badge className="mt-4 bg-success text-success-foreground">
                  <span className="w-2 h-2 bg-success-foreground rounded-full mr-2 animate-pulse"></span>
                  Live Now
                </Badge>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-card rounded-xl p-4 shadow-elegant flex items-center justify-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="icon"
              className="w-12 h-12 rounded-full"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>

            <Button
              variant={isVideoOff ? "destructive" : "secondary"}
              size="icon"
              className="w-12 h-12 rounded-full"
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </Button>

            <Button
              variant={handRaised ? "gold" : "secondary"}
              size="icon"
              className="w-12 h-12 rounded-full"
              onClick={() => setHandRaised(!handRaised)}
            >
              <Hand className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full"
              onClick={() => setShowChat(!showChat)}
            >
              <MessageSquare className="w-5 h-5" />
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="w-12 h-12 rounded-full ml-auto"
            >
              <PhoneOff className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        {showChat && (
          <div className="w-80 flex flex-col gap-4">
            {/* Students List */}
            <div className="bg-card rounded-xl p-4 shadow-elegant">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">Students ({students.length})</h3>
              </div>
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-semibold text-accent-foreground">
                        {student.avatar}
                      </div>
                      <span className="text-sm text-foreground flex-1">{student.name}</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          student.status === "active" ? "bg-success" : "bg-muted"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat */}
            <div className="flex-1 bg-card rounded-xl p-4 shadow-elegant flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">Live Chat</h3>
              </div>

              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="space-y-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-foreground">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-sm text-foreground bg-secondary/50 rounded-lg p-2">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

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
        )}
      </div>
    </MainLayout>
  );
};

export default LiveClass;
