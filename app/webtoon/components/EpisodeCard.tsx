"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Episode } from "../data";

// 에피소드 썸네일 카드 — 첫 컷 썸네일 + 제목 + 설명 + 읽기 버튼.
// hover 시 글래스 강조 + 살짝 스케일업. 테두리에 에피소드 color 포인트.
export default function EpisodeCard({
  episode,
  index,
}: {
  episode: Episode;
  index: number;
}) {
  const thumb = `${episode.imageDir}/01.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link
        href={`/webtoon/${episode.slug}`}
        className="group block overflow-hidden rounded-3xl glass glass-hover transition-all duration-300 hover:scale-[1.02]"
        style={{ borderColor: `${episode.color}40` }}
      >
        {/* 썸네일 */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <img
            src={thumb}
            alt={episode.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

          {/* 테마 배지 */}
          <span
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-md"
            style={{
              backgroundColor: `${episode.color}22`,
              color: episode.color === "#ededed" ? "#ededed" : episode.color,
              boxShadow: `inset 0 0 0 1px ${episode.color}55`,
            }}
          >
            {episode.theme}
          </span>

          {/* 부제 */}
          <p className="absolute bottom-3 left-4 font-mono text-xs uppercase tracking-widest text-zinc-300">
            {episode.subtitle} · {episode.cutCount}컷
          </p>
        </div>

        {/* 본문 */}
        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold text-white">{episode.title}</h3>
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-zinc-400">
            {episode.description}
          </p>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-transform group-hover:gap-2.5"
            style={{
              color: episode.color === "#ededed" ? "#ededed" : episode.color,
            }}
          >
            읽기
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
