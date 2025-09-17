import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Mahmoud Baderaldin",
  description: "Full-stack developer creating high-performance, user-friendly web apps.",
  keywords: "portfolio, web developer, React, Next.js, full-stack, JavaScript, Node.js, developer, web applications",
  authors: [{ name: "Mahmud Baderaldin" }],
  openGraph: {
    title: "My Portfolio",
    description: "Full-stack developer creating high-performance, user-friendly web apps.",
    siteName: "Mahmud Baderaldin",
    images: [
      {
        url: "https://lebwork.b-cdn.net/stuff/og%20mahmud.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
