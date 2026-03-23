"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "AI 에이전트 1대 배치",
  "메신저 연동 (Discord / Slack / Telegram)",
  "초기 설정 및 맞춤 프롬프트 구성",
  "24시간 자동 운영 및 모니터링",
  "월간 성과 리포트",
  "장애 대응 및 유지보수",
  "역할 변경 및 기능 추가 상담",
];

export default function Pricing() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 px-4 section-glow">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-mono text-sm mb-4 tracking-widest">
            PRICING
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            심플한 <span className="gradient-text">요금제</span>
          </h2>
          <p className="text-zinc-500 text-lg">
            복잡한 요금 체계 없이, 하나의 플랜으로 모든 것을 제공합니다
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-3xl p-10 md:p-14 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-500 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-sm text-zinc-500">월</span>
                <span className="text-6xl md:text-7xl font-bold gradient-text">
                  70만원
                </span>
                <span className="text-sm text-zinc-500">부터</span>
              </div>
              <p className="text-zinc-500">
                VAT 별도 · 에이전트 추가 시 별도 상담
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-purple-400" />
                  </div>
                  <span className="text-zinc-300 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => scrollToSection("cta")}
                className="glow-button px-10 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105"
              >
                상담 신청하기
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
