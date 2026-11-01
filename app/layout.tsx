import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sewa - Sri Lanka's #1 On-Demand Home & Emergency Services",
  description:
    "Book verified plumbers, electricians, A/C technicians and more across Sri Lanka. Transparent estimates and a 7-day workmanship warranty.",
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
