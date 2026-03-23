"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Link2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "역할 선택",
    description:
      "뉴스 수집, 고객 응대, 업무 보조 — 원하는 AI 직원의 역할을 선택하세요.",
  },
  {
    number: "02",
    icon: Link2,
    title: "채널 연결",
    description:
      "Discord, Slack, Telegram 중 사용하시는 메신저를 연결해주세요.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "AI 직원 시작",
    description:
      "끝! 설정, 유지보수, 모니터링 전부 저희가 합니다. 바로 일 시킬 수 있습니다.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-4 section-glow">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 font-mono text-sm mb-4 tracking-widest">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="gradient-text">3단계</span>로 끝납니다
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-purple-500/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              {/* Step circle */}
              <div className="relative mx-auto mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 border border-purple-500/20 flex items-center justify-center mx-auto">
                  <step.icon className="w-8 h-8 text-purple-400" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-xs font-bold text-white">
                  {step.number}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
