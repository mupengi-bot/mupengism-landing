"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { characters, factions, type Character } from "../data";

// 캐릭터 도감 — 세력별 필터 탭 + 클릭 시 확대 모달.
export default function CharacterGrid() {
  const [faction, setFaction] = useState("전체");
  const [active, setActive] = useState<Character | null>(null);

  const visible =
    faction === "전체"
      ? characters
      : characters.filter((c) => c.faction === faction);

  // 모달 열림 시 ESC 닫기 + 바디 스크롤 잠금
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <div>
      {/* 세력 필터 탭 */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {factions.map((f) => {
          const on = f === faction;
          return (
            <button
              key={f}
              onClick={() => setFaction(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                on
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                  : "text-zinc-400 glass glass-hover"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* 그리드 */}
      <motion.div
        layout
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((c, i) => (
            <motion.button
              key={c.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: (i % 10) * 0.03 }}
              onClick={() => setActive(c)}
              className="group relative overflow-hidden rounded-2xl text-left glass glass-hover transition-all hover:scale-[1.03]"
              style={{ boxShadow: `inset 0 0 0 1px ${c.color}33` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                <span
                  className="absolute left-2 top-2 h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}` }}
                  aria-hidden="true"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-bold text-white">{c.name}</p>
                <p className="truncate text-xs text-zinc-400">{c.core}</p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 확대 모달 */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-3xl gap-0 overflow-hidden rounded-3xl glass sm:grid-cols-2"
              style={{ boxShadow: `inset 0 0 0 1px ${active.color}55` }}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="닫기"
                className="absolute right-3 top-3 z-10 rounded-full bg-black/40 p-2 text-zinc-200 transition-colors hover:bg-black/70"
              >
                <X size={18} />
              </button>

              <div className="relative aspect-[3/4] sm:aspect-auto">
                <img
                  src={active.img}
                  alt={active.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>

              <div className="flex flex-col justify-center p-6">
                <p
                  className="mb-1 font-mono text-xs uppercase tracking-widest"
                  style={{ color: active.color === "#ffffff" ? "#ededed" : active.color }}
                >
                  {active.faction}
                </p>
                <h3 className="mb-1 text-2xl font-bold text-white">
                  {active.name}
                </h3>
                <p className="mb-4 text-sm text-zinc-400">{active.animal}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${active.color}22`,
                      color: active.color === "#ffffff" ? "#ededed" : active.color,
                      boxShadow: `inset 0 0 0 1px ${active.color}55`,
                    }}
                  >
                    {active.core}
                  </span>
                  <span className="rounded-full px-3 py-1 text-xs font-medium text-zinc-300 glass">
                    {active.trait}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-zinc-300">
                  {active.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
