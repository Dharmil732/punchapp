import "./globals.css";
import RoleNav from "@/components/RoleNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Punch",
  description: "Pharmasave Punch App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="max-w-5xl mx-auto p-4 space-y-4">
          <header className="flex items-center justify-between">
            <div className="text-lg font-semibold">Punch</div>
            <div className="text-sm opacity-70">v12</div>
          </header>
          <RoleNav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
