// app/layout.tsx
'use client'; // <-- This directive marks this as a Client Component
import { Oxanium } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { AuthProvider } from './organiser/contexts/AuthContext'; // Import the context
import { BrowserRouter } from 'react-router-dom';
import './globals.css';

const oxanium = Oxanium({
  subsets: ['latin'],
});

const metadata = {
  title: 'Fest-Book App',
  description: 'Event management app!',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head />
        <body className={oxanium.className}>
          {/* Wrapping children in necessary providers */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
