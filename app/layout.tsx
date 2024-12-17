import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Suara Desa",
  description: "Suara Desa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={` ${montserrat.className} antialiased overflow-y-auto scrollable-page scroll-smooth`}
      >
        <Navbar />

        {children}
        <Footer />
      </body>
    </html>
  );
}
