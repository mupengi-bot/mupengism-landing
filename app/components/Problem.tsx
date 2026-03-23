"use client";

import { motion } from "framer-motion";
import { KeyRound, Brain, Server } from "lucide-react";

const problems = [
  {
    icon: KeyRound,
    title: "복잡한 API 설정",
    description:
      "API 키 발급, 환경변수 설정, 서버 구성... AI를 쓰려면 개발자가 필요합니다.",
  },
  {
    icon: Brain,
    title: "끝없는 프롬프트 엔지니어링",
    description:
      "어떻게 물어야 할지, 어떤 모델을 써야 할지, 결과는 왜 이상한지... 시행착오의 연속입니다.",
  },
  {
    icon: Server,
    title: "인프라 유지보수",
    description:
      "서버 관리, 에러 모니터링, 버전 업데이트... 운영은 또 다른 일입니다.",
  },
];

export default function Problem() {
  return (
    <section className="relative py-32 px-4 section-glow">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-purple-400 font-mono text-sm mb-4 tracking-widest">
            PROBLEM
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            왜 AI를 <span className="gradient-text">못 쓰고</span> 있나요?
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            AI는 이미 충분히 똑똑합니다. 문제는 &lsquo;설치&rsquo;입니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              className="glass glass-hover rounded-2xl p-8 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6">
                <problem.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {problem.title}
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
