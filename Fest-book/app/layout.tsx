import { Oxanium } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const oxanium = Oxanium({
  subsets: ["latin"],
});

export const metadata = {
  title: "Fest-Book App",
  description: "Event management app!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={oxanium.variable}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
