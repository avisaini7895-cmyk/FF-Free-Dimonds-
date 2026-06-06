import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DIMONDTOX - Gaming Rewards Platform",
  description: "Production-ready gaming rewards PWA with referrals, tasks, withdrawals and admin dashboard.",
  manifest: "/manifest.json"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
