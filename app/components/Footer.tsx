"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="relative py-12 px-4 border-t border-zinc-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span className="font-bold text-zinc-300 text-base">무펭이즘</span>
          <span className="hidden md:inline">·</span>
          <span>Built on OpenClaw</span>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <a
            href="mailto:mupengi98@gmail.com"
            className="hover:text-purple-400 transition-colors"
          >
            mupengi98@gmail.com
          </a>
          <span className="hidden md:inline">·</span>
          <span>&copy; 2025 무펭이즘. All rights reserved.</span>
        </div>
      </div>
    </motion.footer>
  );
}
