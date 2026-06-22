"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Episode } from "../data";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

type Props = {
  episode: Episode;
  cuts: string[];
  prev: Episode | null;
  next: Episode | null;
};

// 개별 컷 — 로드 시 fade-in + 미세 스케일업
function Cut({ src, index, title }: { src: string; index: number; title: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.img
      src={src}
      alt={`${title} ${index + 1}컷`}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={loaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="block w-full select-none"
      draggable={false}
    />
  );
}

export default function EpisodeReader({ episode, cuts, prev, next }: Props) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen">
      {/* 스크롤 진행도 바 */}
      <motion.div
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
        className="fixed left-0 top-0 z-50 h-1 w-full bg-gradient-to-r from-purple-500 to-cyan-500"
      />

      {/* 상단 바 (sticky, glass) */}
      <header className="sticky top-0 z-40 glass">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <Link
            href="/webtoon"
            aria-label="갤러리로 돌아가기"
            className="flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm text-zinc-300 glass-hover transition-colors"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">목록</span>
          </Link>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-semibold text-white">
              {episode.title}
            </p>
            <p className="truncate text-xs text-zinc-400">{episode.chapter}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <LikeButton slug={episode.slug} />
            <ShareButton title={episode.title} />
          </div>
        </div>
      </header>

      {/* 에피소드 인트로 — 아크 · 챕터 · 개요 */}
      <div className="mx-auto max-w-[600px] px-4 pb-6 pt-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: `${episode.arcColor}22`,
              color: episode.arcColor,
              boxShadow: `inset 0 0 0 1px ${episode.arcColor}44`,
            }}
          >
            {episode.arc}
          </span>
          <span className="font-mono text-xs text-zinc-500">
            {episode.chapter}
          </span>
          <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-400 ring-1 ring-green-500/20">
            {episode.status}
          </span>
        </div>
        <h1 className="mb-3 text-2xl font-bold leading-tight text-white md:text-3xl">
          {episode.title}
        </h1>
        <p className="mb-3 border-l-2 pl-3 text-sm italic leading-relaxed text-zinc-300" style={{ borderColor: `${episode.color}66` }}>
          {episode.logline}
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">
          {episode.description}
        </p>
      </div>

      {/* 세로 스크롤 리더 — 인스타툰 스타일 */}
      <main
        className="mx-auto max-w-[600px] px-0 sm:px-0"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {cuts.map((src, i) => (
          <Cut key={src} src={src} index={i} title={episode.title} />
        ))}
      </main>

      {/* 끝 표시 */}
      <div className="section-glow mx-auto mt-12 max-w-3xl px-4 pt-8 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          End of {episode.chapter}
        </p>
        <p className="mt-2 text-zinc-300">{episode.logline}</p>
      </div>

      {/* 하단 네비 — 이전/다음 에피소드 */}
      <nav className="mx-auto my-12 grid max-w-3xl grid-cols-2 gap-3 px-4">
        {prev ? (
          <Link
            href={`/webtoon/${prev.slug}`}
            className="group flex items-center gap-3 rounded-2xl p-4 glass glass-hover transition-all"
          >
            <ArrowLeft
              size={18}
              className="shrink-0 text-zinc-400 transition-transform group-hover:-translate-x-0.5"
            />
            <span className="min-w-0">
              <span className="block text-xs text-zinc-500">이전 화</span>
              <span className="block truncate text-sm font-medium text-zinc-200">
                {prev.title}
              </span>
            </span>
          </Link>
        ) : (
          <span className="rounded-2xl p-4 opacity-30 glass" aria-hidden="true" />
        )}

        {next ? (
          <Link
            href={`/webtoon/${next.slug}`}
            className="group flex items-center justify-end gap-3 rounded-2xl p-4 text-right glass glass-hover transition-all"
          >
            <span className="min-w-0">
              <span className="block text-xs text-zinc-500">다음 화</span>
              <span className="block truncate text-sm font-medium text-zinc-200">
                {next.title}
              </span>
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        ) : (
          <Link
            href="/webtoon"
            className="group flex items-center justify-end gap-3 rounded-2xl p-4 text-right glass glass-hover transition-all"
          >
            <span className="min-w-0">
              <span className="block text-xs text-zinc-500">완결</span>
              <span className="block truncate text-sm font-medium text-zinc-200">
                목록으로
              </span>
            </span>
            <ArrowRight
              size={18}
              className="shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        )}
      </nav>
    </div>
  );
}
