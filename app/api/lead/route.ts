import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, companyName, industry, role, channel, channelInfo } =
      await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    if (!companyName) {
      return NextResponse.json(
        { error: "회사명을 입력해주세요." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      const timestamp = new Date().toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
      });

      const message = [
        "🐧 **새 에이전트 배포 요청!**",
        "",
        "**고객 정보**",
        `• 회사명: ${companyName}`,
        `• 업종: ${industry || "미입력"}`,
        `• 이메일: ${email}`,
        "",
        "**에이전트 설정**",
        `• 역할: ${role || "미선택"}`,
        `• 채널: ${channel || "미선택"}`,
        `• 연결 정보: ${channelInfo || "미입력"}`,
        "",
        `🕐 요청 시각: ${timestamp}`,
      ].join("\n");

      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
