import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lemur Storm",
  description: "Belső ötletkártya gyűjtemény AI-generált koncepciók áttekintéséhez.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
