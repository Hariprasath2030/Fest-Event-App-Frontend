import { Oxanium } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { AuthProvider } from './organiser/contexts/AuthContext'; // Import the context
import './globals.css';

const oxanium = Oxanium({
  subsets: ['latin'],
});

const clerkPublishableKey = "pk_test_cmVhZHktd2FzcC0yNi5jbGVyay5hY2NvdW50cy5kZXYk";

if (!clerkPublishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

export const metadata = {
  title: 'Fest-Book App',
  description: 'Event management app!',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
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
