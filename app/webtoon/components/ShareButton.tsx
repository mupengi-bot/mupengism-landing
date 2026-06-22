"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";

// 공유하기 — Web Share API (모바일) + 클립보드 복사 폴백 + 토스트.
export default function ShareButton({ title }: { title: string }) {
  const [toast, setToast] = useState(false);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: `무펭이 사가 — ${title}`,
      text: `무펭이 사가 웹툰 「${title}」`,
      url,
    };

    // 모바일: Web Share API
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // 사용자가 취소 → 폴백으로 떨어지지 않고 종료
        return;
      }
    }

    // 폴백: 클립보드 복사
    try {
      await navigator.clipboard.writeText(url);
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    } catch {
      /* 클립보드 접근 불가 — 무시 */
    }
  };

  return (
    <div className="relative">
      <button
        onClick={share}
        aria-label="공유하기"
        className="flex items-center gap-2 rounded-full px-4 py-2 glass glass-hover transition-colors"
      >
        <Share2 size={18} className="text-zinc-300" />
        <span className="hidden text-sm font-medium text-zinc-200 sm:inline">
          공유
        </span>
      </button>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute left-1/2 top-full z-50 mt-2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-zinc-900 px-3 py-1.5 text-xs text-zinc-100 shadow-lg ring-1 ring-white/10"
          >
            <Check size={14} className="text-cyan-400" />
            링크가 복사되었어요
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
