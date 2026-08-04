import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = Montserrat({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Una carta para ti",
  description: "Una pequeña carta hecha con mucho cariño.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
