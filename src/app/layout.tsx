import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import Navigation from "@/components/navigation/Navigation";
import Footer from "@/components/footer/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "React Gallery 3D Demo",
  description: "A demo website for React Gallery 3D with NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="relative w-screen h-screen">
          <main className="w-full h-full">{children}</main>

          <div className="absolute top-0 left-0 z-10 w-full">
            <Navigation />
          </div>

          <div className="absolute bottom-0 left-0 w-full">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
