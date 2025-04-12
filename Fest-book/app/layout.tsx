import { Oxanium } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

const oxanium = Oxanium({
  subsets: ["latin"],
});

export const metadata = {
  title: "Fest-Book App",
  description: "Event management app!",
};

interface RootLayoutProps {
  children: ReactNode;  // Explicitly type children as ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={oxanium.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
