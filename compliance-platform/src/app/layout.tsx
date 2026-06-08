import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compliance Platform — Bezpieczne publikowanie dla profesji regulowanych",
  description:
    "Platforma compliance dla prawnikow, lekarzy i doradcow finansowych. Sprawdzaj tresc, generuj disclaimery i publikuj bezpiecznie na LinkedIn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
