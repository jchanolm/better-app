import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { Providers } from "./Providers";
import SignInButton from "@/components/SignInButton";
import "./globals.css";

// Load local fonts
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

// Define site metadata, including the favicon
export const metadata: Metadata = {
  title: "Get Better",
  description: "Using competition to make things better.",
  icons: {
    icon: "/favicon.png", // Ensure this points to the correct path in the public directory
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0, backgroundColor: "black" }}
      >
        <Providers>
          {/* Global Navbar */}
          <nav
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid white",
              backgroundColor: "black",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                maxWidth: "1200px",
                width: "100%",
                padding: "0 20px",
              }}
            >
              {/* Logo and Title */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image src="/logo.svg" alt="Better Logo" width={36} height={36} />
                <span
                  style={{
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "500",
                    marginLeft: "10px",
                  }}
                >
                  Better
                </span>
              </div>

              {/* Navbar Links and SignInButton */}
              <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                <Link
                  href="/rounds"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    transition: "font-weight 0.3s",
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  Competitions
                </Link>
                <Link
                  href="/sponsor"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    transition: "font-weight 0.3s",
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  Sponsor
                </Link>
                <Link
                  href="/about"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    fontWeight: "600",
                    transition: "font-weight 0.3s",
                    padding: "5px 10px",
                    borderRadius: "4px",
                  }}
                >
                  About
                </Link>
                <SignInButton />
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div style={{ padding: "20px 60px" }}>{children}</div>
        </Providers>
      </body>
    </html>
  );
}