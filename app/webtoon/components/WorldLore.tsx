"use client";

import { motion } from "framer-motion";
import { lore } from "../data";

// 세계관 소개 섹션 — 3개 핵심 개념 카드.
export default function WorldLore() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {lore.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl p-6 glass glass-hover"
          style={{ boxShadow: `inset 0 0 0 1px ${item.color}33` }}
        >
          {/* 컬러 글로우 */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
            style={{ backgroundColor: `${item.color}33` }}
            aria-hidden="true"
          />
          <p
            className="mb-3 font-mono text-xs uppercase tracking-widest"
            style={{ color: item.color === "#ededed" ? "#ededed" : item.color }}
          >
            {item.tag}
          </p>
          <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-400">{item.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
