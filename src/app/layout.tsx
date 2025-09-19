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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W2SHP892WV"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W2SHP892WV');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}