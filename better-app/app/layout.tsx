import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Get Better",
  description: "A platform using competition to make things better.",
  icons: {
    icon: '/assets/betterlogo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0, backgroundColor: 'black' }}
      >
        {/* Global Navbar */}
        <nav
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid white',
            backgroundColor: 'black',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', width: '100%', padding: '0 20px' }}>
            {/* Logo or App Name */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image src="/favicon.svg" alt="Better Logo" width={24} height={24} />
              <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', marginLeft: '10px' }}>
                Better
              </span>
            </div>

            {/* Navbar Links */}
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flex: 1 }}>
              <Link href="/rounds" style={{ color: 'white', textDecoration: 'none', fontSize: '16px', transition: 'font-weight 0.3s', padding: '5px 10px', borderRadius: '4px' }}>
                Competitions
              </Link>
              <Link href="/sponsor" style={{ color: 'white', textDecoration: 'none', fontSize: '16px', transition: 'font-weight 0.3s', padding: '5px 10px', borderRadius: '4px' }}>
                Sponsor
              </Link>
              <Link href="/about" style={{ color: 'white', textDecoration: 'none', fontSize: '16px', transition: 'font-weight 0.3s', padding: '5px 10px', borderRadius: '4px' }}>
                About
              </Link>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div style={{ padding: '20px 60px' }}>{children}</div>
      </body>
    </html>
  );
}