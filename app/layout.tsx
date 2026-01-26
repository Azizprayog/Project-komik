export const dynamic = "force-dynamic";

import NavbarWrapper from "@/components/NavbarWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <NavbarWrapper />
        <main className="max-w-6xl mx-auto px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
