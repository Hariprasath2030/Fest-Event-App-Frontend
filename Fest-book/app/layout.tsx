// app/layout.tsx
'use client'; // <-- This directive marks this as a Client Component
import { Oxanium } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { AuthProvider } from './organiser/contexts/AuthContext'; // Import the context
// import { BrowserRouter } from 'react-router-dom';
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
    <html lang="en">
      <head />
      <body className={oxanium.className}>
        {/* Wrapping children in necessary providers */}
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
