import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  openGraph: {
    title: "ArcArea - India's First Marketplace for Verified Interior Design, Vastu & Construction Experts",
    description:
      "Connect with verified interior designers, vastu consultants, and construction experts across India. From small spaces to luxury transformations, ArcArea is your trusted partner.",
    url: "https://arcarea.in",
    siteName: "ArcArea",
    images: [
      {
        url: "https://arcarea.in/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArcArea - Verified Home Design Experts Near You",
    description:
      "Discover trusted professionals for interior, vastu & construction on ArcArea. Simplify your space journey today.",
    images: ["https://arcarea.in/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <Navbar />
          {children}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
