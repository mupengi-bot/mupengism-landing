"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const subtitles = [
  "버튼 하나로 나만의 AI 직원",
  "설치부터 운영까지, 다 해드립니다",
  "디스코드, 슬랙, 텔레그램 어디든",
];

export default function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = subtitles[subtitleIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < target.length) {
            setCurrentText(target.slice(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (charIndex > 0) {
            setCurrentText(target.slice(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setSubtitleIndex((subtitleIndex + 1) % subtitles.length);
          }
        }
      },
      isDeleting ? 30 : 60
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, subtitleIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm md:text-base font-mono text-purple-400 mb-6 tracking-widest uppercase">
            AI Agent Managed Service
          </p>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="gradient-text">AI 직원,</span>
          <br />
          <span className="text-white">깔아드립니다</span>
        </motion.h1>

        <motion.div
          className="h-12 md:h-14 flex items-center justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg md:text-2xl text-zinc-400 font-light">
            {currentText}
            <span className="inline-block w-0.5 h-6 md:h-7 bg-purple-400 ml-1 animate-pulse align-middle" />
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={() => scrollToSection("cta")}
            className="glow-button px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
          >
            지금 시작하기
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="px-8 py-4 rounded-full border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-purple-500/50 hover:text-white transition-all duration-300"
          >
            어떻게 작동하나요?
          </button>
        </motion.div>

        <motion.div
          className="mt-16 flex items-center justify-center gap-8 text-zinc-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            현재 운영 중
          </span>
          <span>4개 기업 도입 완료</span>
          <span>평균 응답 3초</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-purple-400" />
        </div>
      </motion.div>
    </section>
  );
}
