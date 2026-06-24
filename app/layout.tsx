import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScrollProvider from './components/SmoothScrollProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Shraddhey Tech | Leading Manufacturing & Export Company in India",
  description:
    "Shraddhey Tech is a trusted Indian manufacturing and export company delivering high-quality industrial products, engineering solutions, and customized manufacturing services for domestic and international markets. Serving industries with innovation, quality, and reliability.",

  keywords: [
    "Shraddhey Tech",
    "Shraddhey",
    "Manufacturing Company India",
    "Industrial Manufacturing",
    "Engineering Solutions",
    "Export Company India",
    "OEM Manufacturing",
    "Industrial Products",
    "Custom Manufacturing",
    "Indian Exporter",
    "B2B Manufacturing",
    "Industrial Technology",
  ],

  authors: [{ name: "Shraddhey Tech" }],
  creator: "Shraddhey Tech",
  publisher: "Shraddhey Tech",

  openGraph: {
    title: "Shraddhey Tech | Manufacturing & Export Excellence",
    description:
      "Leading Indian manufacturing and export company delivering world-class industrial products and engineering solutions.",
    url: "https://shraddheytech.com",
    siteName: "Shraddhey Tech",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shraddhey Tech | Manufacturing & Export Excellence",
    description:
      "Trusted manufacturing and export partner for industrial products and engineering solutions.",
  },

  metadataBase: new URL("https://shraddheytech.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
