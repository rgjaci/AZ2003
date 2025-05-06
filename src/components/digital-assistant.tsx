'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Loader2, User, Bot, Home, X } from 'lucide-react';
import { answerNaturalizationQuestions } from '@/ai/flows/answer-naturalization-questions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { LoginSignupDialog } from './login-signup-dialog'; // Assume this exists

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function DigitalAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    // Initial greeting from the assistant
    { role: 'assistant', content: "Hello! How can I help you with the U.S. naturalization process today?" }
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false); // State to track chat expansion
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const requestCount = useRef(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatExpanded) {
      scrollToBottom();
    }
  }, [messages, isChatExpanded]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    requestCount.current += 1;

    // Expand chat on first request
    if (!isChatExpanded) {
        setIsChatExpanded(true);
    }

    startTransition(async () => {
      try {
        const response = await answerNaturalizationQuestions({ question: userMessage.content });
        const assistantMessage: Message = { role: 'assistant', content: response.answer };
        setMessages((prev) => [...prev, assistantMessage]);

        // Prompt login after the second request's response
        if (requestCount.current === 2) {
           // Add a small delay before showing the login prompt for better UX
          setTimeout(() => setShowLoginPrompt(true), 500);
        }

      } catch (error) {
        console.error('Error calling AI flow:', error);
        const errorMessage: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
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
       // Optionally clear messages or keep history
       // setMessages([{ role: 'assistant', content: "Hello! How can I help you with the U.S. naturalization process today?" }]);
       // requestCount.current = 0;
   }


  return (
    <div className="w-full">
       {/* Initial Input (Hero) */}
      {!isChatExpanded && (
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask me about U.S. naturalization..."
            value={input}
            onChange={handleInputChange}
            className="flex-1 text-base md:text-lg p-4 h-14" // Larger input for hero
            disabled={isPending}
            aria-label="Ask the digital assistant about U.S. naturalization"
          />
          <Button type="submit" size="lg" disabled={isPending || !input.trim()}>
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      )}

       {/* Expanded Chat Overlay View */}
      {isChatExpanded && (
         <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl h-[80vh] flex flex-col shadow-xl border border-border rounded-lg">
                 <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                     <div className="flex items-center gap-2">
                        <Link href="/" passHref>
                             <Button variant="ghost" size="icon" aria-label="Go to Home">
                                 <Home className="h-5 w-5" />
                             </Button>
                         </Link>
                        <CardTitle className="text-xl md:text-2xl">Your Digital Assistant</CardTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={closeChat} aria-label="Close chat">
                        <X className="h-5 w-5" />
                    </Button>
                 </CardHeader>
                <CardContent className="flex-grow p-0 overflow-hidden">
                   <ScrollArea className="h-full p-4">
                     <div className="space-y-4">
                        {messages.map((message, index) => (
                         <div
                           key={index}
                           className={`flex items-start gap-3 ${
                             message.role === 'user' ? 'justify-end' : 'justify-start'
                           }`}
                         >
                           {message.role === 'assistant' && (
                             <Avatar className="h-8 w-8 border border-primary flex-shrink-0">
                                <AvatarFallback>
                                 <Bot className="h-5 w-5 text-primary" />
                                </AvatarFallback>
                             </Avatar>
                           )}
                           <div
                             className={`rounded-lg p-3 max-w-[75%] text-sm shadow-sm ${
                               message.role === 'user'
                                 ? 'bg-primary text-primary-foreground'
                                 : 'bg-accent text-accent-foreground'
                             }`}
                           >
                             {message.content}
                           </div>
                            {message.role === 'user' && (
                             <Avatar className="h-8 w-8 border border-secondary flex-shrink-0">
                               <AvatarFallback>
                                 <User className="h-5 w-5 text-secondary" />
                               </AvatarFallback>
                             </Avatar>
                           )}
                         </div>
                       ))}
                       {isPending && (
                        <div className="flex items-start gap-3 justify-start">
                            <Avatar className="h-8 w-8 border border-primary flex-shrink-0">
                               <AvatarFallback>
                                 <Bot className="h-5 w-5 text-primary" />
                               </AvatarFallback>
                             </Avatar>
                           <div className="rounded-lg p-3 bg-accent text-accent-foreground shadow-sm">
                             <Loader2 className="h-5 w-5 animate-spin" />
                           </div>
                         </div>
                       )}
                       <div ref={messagesEndRef} />
                     </div>
                   </ScrollArea>
                </CardContent>
                 <div className="p-4 border-t">
                   <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                     <Input
                       type="text"
                       placeholder="Type your message..."
                       value={input}
                       onChange={handleInputChange}
                       className="flex-1"
                       disabled={isPending}
                       aria-label="Type your message"
                     />
                     <Button type="submit" size="icon" disabled={isPending || !input.trim()} aria-label="Send message">
                       {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                     </Button>
                   </form>
                 </div>
            </Card>
         </div>
      )}

      {/* Login/Signup Dialog */}
      <LoginSignupDialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt} />
    </div>
  );
}
