import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glen Pierce Blog",
  description: "Essays from Glen Pierce on architecture, AI-assisted engineering, and resilient software systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
