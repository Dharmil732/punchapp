import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Punch",
  description: "Pharmasave Punch App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="max-w-5xl mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
