
'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowUp, Loader2, User, Bot, Home, X, MessageSquare, Plus, Settings2, LogIn } from 'lucide-react';
import { answerNaturalizationQuestions } from '@/ai/flows/answer-naturalization-questions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { LoginSignupDialog } from './login-signup-dialog';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

const placeholderMessages = [
  "Ask me about U.S. naturalization...",
  "Pregúntame sobre la naturalización de EE. UU...", // Spanish
  "Posez-moi des questions sur la naturalisation américaine...", // French
  "美国入籍相关问题，请问我...", // Chinese (Simplified)
  " अमेरिकी प्राकृतिककरण के बारे में मुझसे पूछें...", // Hindi
  "اسألني عن التجنيس في الولايات المتحدة...", // Arabic
  "Pergunte-me sobre a naturalização nos EUA...", // Portuguese
];

// Mock chat history data
const mockChatHistory: ChatSession[] = [
  { id: '1', title: 'Green Card Eligibility', messages: [], lastUpdated: new Date(Date.now() - 86400000 * 1) }, // Yesterday
  { id: '2', title: 'N-400 Form Questions', messages: [], lastUpdated: new Date(Date.now() - 86400000 * 2) },
  { id: '3', title: 'Civics Test Study Plan', messages: [], lastUpdated: new Date(Date.now() - 86400000 * 5) }, // Previous 7 days
  { id: '4', title: 'Interview Preparation', messages: [], lastUpdated: new Date(Date.now() - 86400000 * 10) }, // Previous 30 days
];

// Helper function to render simple markdown bold
const renderBoldText = (text: string): React.ReactNode => {
  if (!text) return '';
  const parts = text.split('**');
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
};


export function DigitalAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! How can I help you with the U.S. naturalization process today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholderMessages[0]);
  const [isPending, startTransition] = useTransition();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const requestCount = useRef(0);
  const placeholderIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null); // To manage which chat is active

  const mainInputFormRef = useRef<HTMLFormElement>(null);
  const [showStickyInputBar, setShowStickyInputBar] = useState(false);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatExpanded) {
      scrollToBottom();
    }
  }, [messages, isChatExpanded]);

  useEffect(() => {
    if (!isChatExpanded) {
      let currentIndex = 0;
      placeholderIntervalRef.current = setInterval(() => {
        currentIndex = (currentIndex + 1) % placeholderMessages.length;
        setCurrentPlaceholder(placeholderMessages[currentIndex]);
      }, 2500);
    } else {
      if (placeholderIntervalRef.current) {
        clearInterval(placeholderIntervalRef.current);
      }
    }
    return () => {
      if (placeholderIntervalRef.current) {
        clearInterval(placeholderIntervalRef.current);
      }
    };
  }, [isChatExpanded]);

  useEffect(() => {
    if (isChatExpanded || !mainInputFormRef.current) {
      setShowStickyInputBar(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar if main input is not intersecting AND chat is not expanded
        setShowStickyInputBar(!entry.isIntersecting && !isChatExpanded);
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    const currentMainInputForm = mainInputFormRef.current;
    if (currentMainInputForm) {
        observer.observe(currentMainInputForm);
    }


    return () => {
      if (currentMainInputForm) {
        observer.unobserve(currentMainInputForm);
      }
      observer.disconnect(); // Clean up observer
    };
  }, [isChatExpanded]); // Rerun when chat expansion state changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    const currentInputForAPI = input;
    setInput('');

    requestCount.current += 1;

    if (!isChatExpanded) {
      setIsChatExpanded(true);
    }

    startTransition(async () => {
      try {
        const response = await answerNaturalizationQuestions({ question: currentInputForAPI });
        const assistantMessage: Message = { role: 'assistant', content: response.answer, timestamp: new Date() };
        setMessages((prev) => [...prev, assistantMessage]);

        if (requestCount.current === 2 && !showLoginPrompt) {
          setTimeout(() => setShowLoginPrompt(true), 500);
        }
      } catch (error) {
        console.error('Error calling AI flow:', error);
        const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date() };
        setMessages((prev) => [...prev, errorMessage]);
        toast({
          title: "Error",
          description: "Failed to get response from the assistant.",
          variant: "destructive",
        });
      }
    });
  };

  const closeChat = () => {
    setIsChatExpanded(false);
  };

  const startNewChat = () => {
    setMessages([
      { role: 'assistant', content: "Hello! How can I help you with the U.S. naturalization process today?", timestamp: new Date() }
    ]);
    setInput('');
    requestCount.current = 0;
    setActiveChatId(null); // Or generate a new ID for saving
  }

  const groupMessagesByDate = (messageList: Message[]) => {
    const groups: { [key: string]: Message[] } = {};
    messageList.forEach(msg => {
      const dateKey = msg.timestamp.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(msg);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);


  if (isChatExpanded) {
    return (
      <div className={cn(
        "fixed inset-0 z-50 flex bg-background text-foreground",
        "animate-in fade-in-0 duration-300"
      )}>
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border flex-shrink-0 hidden md:flex flex-col p-3 space-y-3">
          <Button variant="outline" className="w-full justify-start rounded-lg" onClick={startNewChat}>
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
          <Separator />
          <ScrollArea className="flex-grow">
            <div className="space-y-2 pr-2">
              {/* Mock Chat History Sections */}
              <p className="text-xs font-medium text-muted-foreground px-2">Today</p>
              {mockChatHistory.filter(chat => differenceInDays(new Date(), chat.lastUpdated) < 1).map(chat => (
                <Button key={chat.id} variant="ghost" className="w-full justify-start truncate rounded-lg text-sm" onClick={() => setActiveChatId(chat.id)}>
                  <MessageSquare className="mr-2 h-4 w-4" /> {chat.title}
                </Button>
              ))}
              <p className="text-xs font-medium text-muted-foreground px-2 pt-2">Yesterday</p>
               {mockChatHistory.filter(chat => differenceInDays(new Date(), chat.lastUpdated) >= 1 && differenceInDays(new Date(), chat.lastUpdated) < 2).map(chat => (
                <Button key={chat.id} variant="ghost" className="w-full justify-start truncate rounded-lg text-sm" onClick={() => setActiveChatId(chat.id)}>
                  <MessageSquare className="mr-2 h-4 w-4" /> {chat.title}
                </Button>
              ))}
              <p className="text-xs font-medium text-muted-foreground px-2 pt-2">Previous 7 Days</p>
              {mockChatHistory.filter(chat => differenceInDays(new Date(), chat.lastUpdated) >= 2 && differenceInDays(new Date(), chat.lastUpdated) < 7).map(chat => (
                <Button key={chat.id} variant="ghost" className="w-full justify-start truncate rounded-lg text-sm" onClick={() => setActiveChatId(chat.id)}>
                  <MessageSquare className="mr-2 h-4 w-4" /> {chat.title}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start rounded-lg text-sm">
              <Settings2 className="mr-2 h-4 w-4" /> Settings
            </Button>
             <Button variant="ghost" className="w-full justify-start rounded-lg text-sm" onClick={() => setShowLoginPrompt(true)}>
              <LogIn className="mr-2 h-4 w-4" /> Login / Sign Up
            </Button>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="p-4 border-b border-border flex justify-between items-center h-16 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Link href="/" passHref>
                <Button variant="ghost" size="icon" aria-label="Go to Home" onClick={closeChat} className="md:hidden"> {/* Mobile only Home button */}
                  <Home className="h-5 w-5" />
                </Button>
              </Link>
               <div className="flex flex-col">
                <h1 className="text-xl font-semibold text-primary">Your Digital Assistant</h1>
                <Link href="/" passHref>
                    <Button variant="link" size="sm" onClick={closeChat} className="text-xs text-muted-foreground p-0 h-auto hidden md:block">
                         Back to Home
                    </Button>
                </Link>
              </div>
            </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setShowLoginPrompt(true)} className="rounded-full">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Login or User Profile</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={closeChat} aria-label="Close chat" className="md:hidden"> {/* Mobile only Close button */}
                    <X className="h-5 w-5" />
                </Button>
            </div>
          </header>

          <ScrollArea className="flex-grow p-4 md:p-6">
             <div className="max-w-3xl mx-auto space-y-6">
                {Object.entries(groupedMessages).map(([date, msgsInDate]) => (
                  <div key={date}>
                    <div className="text-center text-xs text-muted-foreground my-4">{date}</div>
                    {msgsInDate.map((message, index) => (
                    <div
                      key={`${date}-${index}`}
                      className={`flex items-start gap-3 my-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={cn(
                            "p-3 text-sm shadow-sm whitespace-pre-wrap",
                            message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-3xl rounded-br-lg ml-auto max-w-[75%]'
                            : 'bg-background text-foreground rounded-3xl rounded-bl-lg mr-auto w-full text-left'
                        )}
                      >
                        {message.role === 'assistant' ? renderBoldText(message.content) : message.content}
                      </div>
                    </div>
                  ))}
                  </div>
                ))}
              {isPending && (
                <div className="flex items-start gap-3 justify-start my-3">
                  <div className="rounded-3xl rounded-bl-lg p-3 bg-background text-foreground shadow-sm">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border bg-background flex-shrink-0">
             <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mx-auto items-center space-x-2 bg-input rounded-full p-1 border border-border focus-within:ring-2 focus-within:ring-primary transition-shadow shadow-sm">
              <Input
                type="text"
                placeholder="Ask anything..."
                value={input}
                onChange={handleInputChange}
                className="flex-1 bg-transparent border-none focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 text-base h-10 px-4"
                disabled={isPending}
                aria-label="Type your message"
              />
              <Button type="submit" size="icon" disabled={isPending || !input.trim()} aria-label="Send message" className="bg-primary hover:bg-primary/90 rounded-full h-9 w-9">
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
              </Button>
            </form>
             <p className="text-xs text-muted-foreground text-center mt-2">
                AI can make mistakes. Consider checking important information.
             </p>
          </div>
        </main>
      </div>
    );
  }


  return (
    <div className="w-full">
      {!isChatExpanded && (
        <form ref={mainInputFormRef} onSubmit={handleSubmit} className="relative w-full group">
          <Input
            type="text"
            placeholder={currentPlaceholder}
            value={input}
            onChange={handleInputChange}
            className="text-base md:text-lg p-4 h-14 rounded-full pl-6 pr-16 bg-input focus-visible:ring-primary/50 transition-all duration-300 ease-in-out placeholder:opacity-100 focus:placeholder:opacity-0 animate-in fade-in-0"
            disabled={isPending}
            aria-label="Ask the digital assistant about U.S. naturalization"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 right-2 h-11 w-11 rounded-full bg-foreground/10 hover:bg-foreground/20 focus-visible:ring-primary/50"
            disabled={isPending || !input.trim()}
            aria-label="Send message"
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <ArrowUp className="h-5 w-5 text-primary" />
            )}
          </Button>
        </form>
      )}


      {/* Sticky Input Bar */}
      {!isChatExpanded && showStickyInputBar && (
         <div className="fixed bottom-0 left-0 right-0 bg-transparent p-3 z-40 animate-in slide-in-from-bottom-8 duration-300">
          <form onSubmit={handleSubmit} className="container mx-auto max-w-xl">
            <div className={cn(
              "relative group mx-auto transition-all duration-300 ease-in-out",
              "w-60", // Default narrow width
              "hover:w-full focus-within:w-full" // Expand on hover/focus
            )}>
              <Input
                type="text"
                placeholder="Ask a quick question..."
                value={input}
                onChange={handleInputChange}
                className={cn(
                  "w-full h-10 text-sm rounded-full pl-4 pr-10 bg-input focus-visible:ring-primary/50",
                  "transition-all duration-300 ease-in-out" // Smooth transition for width change
                )}
                disabled={isPending}
                aria-label="Ask the digital assistant"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute top-1/2 -translate-y-1/2 right-1 h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center"
                disabled={isPending || !input.trim()}
                aria-label="Send message from sticky bar"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      <LoginSignupDialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt} />
    </div>
  );
}

// Helper function to get difference in days (simplified)
function differenceInDays(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

    