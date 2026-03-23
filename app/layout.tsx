import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "무펭이즘 | AI 직원, 깔아드립니다",
  description:
    "버튼 하나로 나만의 AI 직원을 배치하세요. 뉴스 수집, 고객 응대, 업무 보조까지 — 설치부터 운영까지 무펭이즘이 다 합니다.",
  keywords: [
    "AI 에이전트",
    "AI 직원",
    "무펭이즘",
    "AI 자동화",
    "소규모 사업 AI",
    "디스코드 봇",
    "슬랙 봇",
    "텔레그램 봇",
  ],
  openGraph: {
    title: "무펭이즘 | AI 직원, 깔아드립니다",
    description:
      "버튼 하나로 나만의 AI 직원을 배치하세요. 설치부터 운영까지 무펭이즘이 다 합니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "무펭이즘 | AI 직원, 깔아드립니다",
    description:
      "버튼 하나로 나만의 AI 직원을 배치하세요. 설치부터 운영까지 무펭이즘이 다 합니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#0a0a0a] text-[#ededed]">{children}</body>
    </html>
  );
}
