'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { LoginSignupDialog } from '@/components/login-signup-dialog';

export function Header() {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/citizenship-timer', label: 'Citizenship Timer' },
    // Add more links as needed (About, Services, Contact, etc.)
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-auto flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
              <span className="font-bold hidden sm:inline-block">Citizenship Navigator</span>
              <span className="font-bold sm:hidden">CitizenNav</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop Login Button - Keep if needed for non-chat pages */}
           <div className="hidden md:flex items-center ml-auto">
            <Button variant="outline" onClick={() => setIsLoginDialogOpen(true)} className="rounded-full">
              <UserCircle2 className="mr-2 h-4 w-4" /> Login
            </Button>
          </div>


          {/* Mobile Menu & Login */}
          <div className="flex flex-1 items-center justify-end md:hidden">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsLoginDialogOpen(true)} className="px-2 rounded-full">
                    <UserCircle2 className="h-5 w-5" />
                    <span className="sr-only">Login</span>
                </Button>
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                    <nav className="grid gap-6 text-lg font-medium mt-6">
                        {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-2 transition-colors hover:text-foreground/80 text-foreground/60"
                        >
                            {item.label}
                        </Link>
                        ))}
                        <Button variant="outline" className="rounded-full" onClick={() => {
                            setIsLoginDialogOpen(true);
                        }}>
                            <UserCircle2 className="mr-2 h-5 w-5" /> Login / Sign Up
                        </Button>
                    </nav>
                    </SheetContent>
                </Sheet>
            </div>
          </div>
        </div>
      </header>
      <LoginSignupDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
    </>
  );
}
