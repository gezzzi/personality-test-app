import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "性格診断アプリ - 就活・婚活のための自己分析ツール",
  description: "ビッグファイブ理論に基づいた性格診断で、あなたの強みを発見。就職活動や結婚相談所での自己PRに活用できます。",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="light"
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
