"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

// 좋아요 버튼 — localStorage 시뮬레이션.
// 기본 카운트는 slug 기반 결정론적 랜덤(100~999) + 사용자 클릭.
function seededBase(slug: string): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return 100 + (h % 900);
}

type Particle = { id: number; x: number; y: number };

export default function LikeButton({ slug }: { slug: string }) {
  const storageKey = `webtoon:like:${slug}`;
  const [liked, setLiked] = useState(false);
  const [base, setBase] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setBase(seededBase(slug));
    try {
      setLiked(localStorage.getItem(storageKey) === "1");
    } catch {
      /* localStorage 접근 불가 — 무시 */
    }
    setMounted(true);
  }, [slug, storageKey]);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    try {
      if (next) localStorage.setItem(storageKey, "1");
      else localStorage.removeItem(storageKey);
    } catch {
      /* 무시 */
    }
    if (next) {
      // 하트 파티클 분출
      const burst = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60,
        y: -30 - Math.random() * 40,
      }));
      setParticles((p) => [...p, ...burst]);
      setTimeout(() => {
        setParticles((p) => p.filter((q) => !burst.some((b) => b.id === q.id)));
      }, 800);
    }
  };

  const count = base + (liked ? 1 : 0);

  return (
    <button
      onClick={toggle}
      aria-pressed={liked}
      aria-label="좋아요"
      className="relative flex items-center gap-2 rounded-full px-4 py-2 glass glass-hover transition-colors"
    >
      <span className="relative">
        <motion.span
          key={liked ? "on" : "off"}
          initial={{ scale: 0.6 }}
          animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
          transition={{ duration: 0.35 }}
          className="block"
        >
          <Heart
            size={18}
            className={liked ? "fill-rose-500 text-rose-500" : "text-zinc-300"}
          />
        </motion.span>

        {/* 파티클 */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2"
            >
              <Heart size={12} className="fill-rose-400 text-rose-400" />
            </motion.span>
          ))}
        </AnimatePresence>
      </span>

      <span className="text-sm font-medium tabular-nums text-zinc-200">
        {mounted ? count.toLocaleString("ko-KR") : ""}
      </span>
    </button>
  );
}
