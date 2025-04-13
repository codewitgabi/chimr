import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ThemeProvider from "@/components/providers/ThemeProvider";

const font = Josefin_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chimr",
    template: "%s | Chimr",
  },
  description:
    "Chimr is a modern chat application that helps you connect and collaborate with friends and teams in real-time.",
  metadataBase: new URL("https://chimr.vercel.app"), // Replace with your actual domain

  keywords: [
    "Chimr",
    "chat app",
    "messaging",
    "realtime chat",
    "group chat",
    "React chat app",
    "Next.js messaging",
  ],

  authors: [
    {
      name: "Gabriel Michael Ojomakpene",
      url: "https://codewitgabi.vercel.app",
    },
  ],

  creator: "Chimr Team",

  openGraph: {
    title: "Chimr",
    description:
      "A powerful and seamless chat platform built for modern communication.",
    url: "https://chimr.vercel.app",
    siteName: "Chimr",
    images: [
      {
        url: "/apple-touch-icon.png", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "Chimr App",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chimr",
    description: "Chat and connect effortlessly with Chimr.",
    creator: "@codewitgabi1", // Your Twitter handle
    images: ["/apple-touch-icon.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* Toast */}

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
