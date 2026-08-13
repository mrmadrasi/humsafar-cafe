import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex",
});

export const metadata: Metadata = {
  title: "Humsafar Café — Har Mulaqat Ki Ek Kahani ❤️",
  description: "Discover Humsafar Café — a romantic café experience filled with coffee, conversations, music and unforgettable moments for two.",
  keywords: ["Humsafar Cafe", "Romantic Cafe", "Date Night Cafe", "Couple Cafe", "Special Coffee", "Candlelight Date"],
  authors: [{ name: "Humsafar Café" }],
  openGraph: {
    title: "Humsafar Café — Har Mulaqat Ki Ek Kahani ❤️",
    description: "Coffee, conversations & melodies made for two. Step into a romantic evening built for love stories.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night" className={`${cormorant.variable} ${jakarta.variable} ${alexBrush.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col selection:bg-rose-500 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
