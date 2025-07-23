import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Arcarea® – India’s #1 Interior Design & Construction Marketplace",
  description:
    "Discover Arcarea – India’s first marketplace for Interior Design, Vastu-Compliant Homes, Renovation, and Turnkey Construction. Verified Experts. Custom Solutions.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        

       <SessionWrapper><Navbar />{children}<Footer/></SessionWrapper>
      </body>
    </html>
  );
}
