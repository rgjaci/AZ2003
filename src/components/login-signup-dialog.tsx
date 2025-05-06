'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";

interface LoginSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginSignupDialog({ open, onOpenChange }: LoginSignupDialogProps) {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup form

  // Placeholder login/signup logic
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...");
    // Add actual authentication logic here (e.g., Firebase Auth, NextAuth.js)
    onOpenChange(false); // Close dialog on successful auth (replace with actual logic)
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Log In" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            {isLogin
              ? "Enter your credentials to access your account."
              : "Create an account to save progress and chat history."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAuth}>
            <div className="grid gap-4 py-4">
                 {!isLogin && (
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" placeholder="Your Name" className="col-span-3" required />
                    </div>
                 )}
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                    Email
                </Label>
                <Input id="email" type="email" placeholder="your@email.com" className="col-span-3" required/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                    Password
                </Label>
                <Input id="password" type="password" placeholder="********" className="col-span-3" required />
                </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center pt-2">
                 <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm p-0 h-auto"
                >
                    {isLogin ? "Need an account? Sign Up" : "Already have an account? Log In"}
                </Button>
                <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button type="submit">{isLogin ? "Log In" : "Sign Up"}</Button>
                </div>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
