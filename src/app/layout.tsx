import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

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
    <html lang="ja">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
          {children}
        </main>
      </body>
    </html>
  )
}
