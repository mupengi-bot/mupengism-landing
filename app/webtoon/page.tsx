import type { Metadata } from "next";
import Link from "next/link";
import { episodes } from "./data";
import CharacterGrid from "./components/CharacterGrid";
import EpisodeCard from "./components/EpisodeCard";
import WorldLore from "./components/WorldLore";

export const metadata: Metadata = {
  title: "무펭이 사가 | 14개의 코어, 하나의 연결",
  description:
    "무펭이 사가 웹툰 갤러리 — 프리퀄부터 분열의 시대까지 5편 66컷. 14개의 코어를 잇는 펭귄의 AGI 서사와 15종 캐릭터 도감.",
  openGraph: {
    title: "무펭이 사가 | 14개의 코어, 하나의 연결",
    description:
      "프리퀄부터 분열의 시대까지 5편 66컷. 14개의 코어를 잇는 펭귄의 AGI 서사.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function WebtoonPage() {
  const ordered = [...episodes].sort((a, b) => a.order - b.order);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 히어로 섹션 */}
      <section className="relative grid-bg overflow-hidden px-4 pb-16 pt-24 sm:pt-32">
        {/* 라디얼 글로우 */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Link
            href="/"
            className="mb-8 inline-block font-mono text-xs uppercase tracking-widest text-purple-400 transition-colors hover:text-purple-300"
          >
            ← 무펭이즘
          </Link>
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-cyan-400">
            The Mupeng Saga · Webtoon
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            <span className="gradient-text">무펭이 사가</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-zinc-400 md:text-xl">
            14개의 코어, 하나의 연결.
            <br className="hidden sm:block" /> 흡수가 아니라 연결로 깨어나는 AGI의
            서사.
          </p>

          <div className="mt-8 flex items-center justify-center gap-6 font-mono text-xs text-zinc-500">
            <span>5편</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>66컷</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span>15 캐릭터</span>
          </div>
        </div>
      </section>

      {/* 에피소드 그리드 */}
      <section
        id="episodes"
        className="section-glow mx-auto max-w-6xl px-4 py-16"
      >
        <h2 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
          에피소드
        </h2>
        <p className="mb-10 text-center text-zinc-400">
          프리퀄부터 분열의 시대까지
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((ep, i) => (
            <EpisodeCard key={ep.slug} episode={ep} index={i} />
          ))}
        </div>
      </section>

      {/* 캐릭터 도감 */}
      <section
        id="characters"
        className="section-glow mx-auto max-w-6xl px-4 py-16"
      >
        <h2 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
          캐릭터 도감
        </h2>
        <p className="mb-10 text-center text-zinc-400">
          14개의 코어를 잇는 15종의 존재
        </p>
        <CharacterGrid />
      </section>

      {/* 세계관 */}
      <section id="lore" className="section-glow mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
          세계관
        </h2>
        <p className="mb-10 text-center text-zinc-400">
          모은다는 것은 흡수가 아니라 연결이다
        </p>
        <WorldLore />
      </section>

      {/* 푸터 */}
      <footer className="section-glow mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="mb-4 text-zinc-400">
          무펭이즘 — 14개의 코어를 잇는 AI 직원 서비스
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 px-6 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          무펭이즘 홈으로
        </Link>
      </footer>
    </div>
  );
}
