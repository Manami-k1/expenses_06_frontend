import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/provider/ClientProviders";
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
