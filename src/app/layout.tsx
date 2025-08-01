import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "expenses_06",
  description: "expenses_06",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
