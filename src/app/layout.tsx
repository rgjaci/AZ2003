import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { Providers } from './providers'; // Import Providers

// Correctly assign variables for font usage
const geistSansFont = GeistSans;

export const metadata: Metadata = {
  title: 'Citizenship Navigator',
  description: 'Empowering immigrants towards U.S. naturalization.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSansFont.variable}>
      {/* The body tag must immediately follow the html tag without any whitespace or comments */}
      <body className="antialiased flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
