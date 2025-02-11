import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/ui/navbar";
import Banner from "@/components/ui/banner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "ManaMasjid - Centralized Kurnool Salah Timings",
  description:
    "Accurate and centralized Salah timings for Kurnool, including daily prayer schedules and updates.",
  keywords: [
    "Kurnool Salah timings",
    "ManaMasjid",
    "prayer times",
    "Namaz schedule",
    "Islamic prayers",
  ],
  authors: [{ name: "Hakeem Salman" }], // Corrected authors field
  openGraph: {
    type: "website",
    url: "https://manamasjid.vercel.app", // Replace with actual URL
    title: "ManaMasjid - Centralized Kurnool Salah Timings",
    description:
      "Stay updated with accurate and centralized Salah timings for Kurnool.",
    siteName: "ManaMasjid",
    images: [
      {
        url: "/logo.png", // Replace with actual OG image path
        width: 500,
        height: 500,
        alt: "ManaMasjid - Kurnool Salah Timings",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased `}>
        <div className="">
          <Navbar />
          {children}
        </div>
        <div className="fixed bottom-0 w-full">
          <Banner />
        </div>
      </body>
    </html>
  );
}
