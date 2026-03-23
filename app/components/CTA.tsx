"use client";

import { motion } from "framer-motion";
import OnboardingWizard from "./OnboardingWizard";

export default function CTA() {
  return (
    <section id="cta" className="relative py-32 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            지금, <span className="gradient-text">AI 직원</span>을
            <br />
            만나보세요
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            30초 만에 나만의 AI 직원을 체험하세요.
            <br />
            실제로 대화해보고, 가능성을 확인하세요.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <OnboardingWizard />
        </motion.div>
      </div>
    </section>
  );
}
