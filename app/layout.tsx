import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import SiteHeader from "@/components/ui/header";
import SiteFooter from "@/components/ui/footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Stephen Mola Portfolio",
  description: "A portfolio page for Stephen Mola, showcasing projects and skills in web development.",
  keywords: ["Stephen Mola", "Web Developer", "Portfolio", "React", "Next.js"],
  authors: [{ name: "Stephen Mola" }],
  openGraph: {
    title: "Stephen Mola Portfolio",
    description: "Explore Stephen Mola's web development projects and skills.",
    url: "https://stephenmola.com",
    siteName: "Stephen Mola Portfolio",
    images: [
      {
        url: "https://stephenmola.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stephen Mola Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stephen Mola Portfolio",
    description: "Explore Stephen Mola's web development projects and skills.",
    creator: "@stephenmola",
    images: ["https://stephenmola.com/twitter-image.jpg"],
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1873939027879602"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} antialiased bg-zinc-900 text-zinc-100 min-h-screen flex flex-col`}>
        <SiteHeader />
        <main className="flex-grow">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

