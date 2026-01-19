import "./globals.css"
import Navbar from "@/components/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
          {children}
        </main>

        {/* footer nanti kita pisahin juga */}
      </body>
    </html>
  )
}
