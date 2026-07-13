import type { Metadata } from "next";
import { spaceGrotesk, playfair, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahmoud Baderaldin — Full-Stack Engineer",
  description:
    "Signal over noise. Full-stack engineer from Lebanon building products that load fast, work everywhere, and make money.",
  keywords:
    "portfolio, web developer, React, Next.js, full-stack, TypeScript, Node.js, Flask, PostgreSQL, Lebanon",
  authors: [{ name: "Mahmoud Baderaldin" }],
  openGraph: {
    title: "Mahmoud Baderaldin — Full-Stack Engineer",
    description:
      "Signal over noise. Full-stack engineer building products that load fast, work everywhere, and make money.",
    siteName: "Mahmoud Baderaldin",
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
        className={`${spaceGrotesk.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
