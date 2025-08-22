import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "@/components/provider/ClientProvider";
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
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
