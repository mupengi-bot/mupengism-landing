"use client";

import { motion } from "framer-motion";
import { Newspaper, Headphones, ClipboardList } from "lucide-react";

const roles = [
  {
    icon: Newspaper,
    title: "뉴스 수집형",
    subtitle: "News Collector Agent",
    description:
      "업계 뉴스, 트렌드, 경쟁사 동향을 자동으로 수집하고 요약해서 매일 아침 전달합니다.",
    example: "\"매일 오전 9시, 업계 뉴스 5개를 요약해서 디스코드에 올려줘\"",
    gradient: "from-purple-600 to-purple-400",
    borderColor: "hover:border-purple-500/30",
  },
  {
    icon: Headphones,
    title: "고객 응대형",
    subtitle: "Customer Support Agent",
    description:
      "FAQ 기반으로 고객 질문에 24시간 자동 응답합니다. 복잡한 문의는 담당자에게 전달합니다.",
    example: "\"고객이 배송 문의하면 자동으로 답변하고, 환불 건은 나한테 알려줘\"",
    gradient: "from-cyan-600 to-cyan-400",
    borderColor: "hover:border-cyan-500/30",
  },
  {
    icon: ClipboardList,
    title: "업무 보조형",
    subtitle: "Task Assistant Agent",
    description:
      "회의록 정리, 일정 관리, 데이터 정리 등 반복적인 업무를 대신 처리합니다.",
    example: "\"회의 끝나면 요약해서 슬랙에 올리고, 할 일 목록 뽑아줘\"",
    gradient: "from-purple-500 to-cyan-500",
    borderColor: "hover:border-purple-500/30",
  },
];

export default function AgentRoles() {
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
            AGENT ROLES
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            어떤 <span className="gradient-text">AI 직원</span>이 필요하세요?
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            세 가지 역할 중 선택하세요. 커스터마이징도 가능합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              className={`glass rounded-2xl p-8 transition-all duration-300 border border-transparent ${role.borderColor} hover:transform hover:-translate-y-1`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} bg-opacity-20 flex items-center justify-center mb-6`}
                style={{ background: `linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.15))` }}
              >
                <role.icon className="w-7 h-7 text-purple-400" />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">
                {role.title}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mb-4">
                {role.subtitle}
              </p>
              <p className="text-zinc-300 leading-relaxed mb-6">
                {role.description}
              </p>

              <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
                <p className="text-sm text-zinc-400 mb-1">사용 예시</p>
                <p className="text-sm text-cyan-400/80 italic">
                  {role.example}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
