import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "Social Worker Portfolio",
  description: "Professional portfolio inspired by Atipo Foundry Wotfard design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
