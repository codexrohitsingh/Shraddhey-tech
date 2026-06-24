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
  metadataBase: new URL("https://shraddheytech.com"),

  title:
    "Manufacturing & Export Company in India | Industrial Products & Engineering Solutions | Shraddhey Tech",

  description:
    "Shraddhey Tech is a leading manufacturing and export company in India providing industrial products, engineering solutions, OEM manufacturing, and customized production services for global markets.",

  keywords: [
    "manufacturing company india",
    "export company india",
    "industrial products manufacturer",
    "engineering solutions india",
    "OEM manufacturing",
    "custom manufacturing",
    "industrial exporter",
    "B2B manufacturing",
    "Shraddhey Tech",
  ],

  alternates: {
    canonical: "https://shraddheytech.com",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Manufacturing & Export Company in India | Shraddhey Tech",
    description:
      "Leading Indian manufacturing and export company delivering industrial products and engineering solutions worldwide.",
    url: "https://shraddheytech.com",
    siteName: "Shraddhey Tech",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          <Navbar />
          <div style={{ display: "none" }}>
            Rohit singh email-:rs21rohit@gmail.com
          </div>
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
