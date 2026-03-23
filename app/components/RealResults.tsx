"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Clock, MessageSquare, Zap } from "lucide-react";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * value);
      setDisplay(start);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  );
}

const customers = [
  {
    name: "디플랫코리아",
    role: "뉴스 수집형 도입",
    icon: TrendingUp,
    metric: "일일 뉴스 수집",
    value: 150,
    suffix: "건",
    quote: "매일 아침 업계 뉴스가 정리되어 있으니, 하루를 전략적으로 시작할 수 있게 되었습니다.",
  },
  {
    name: "Paul37",
    role: "고객 응대형 도입",
    icon: Clock,
    metric: "평균 응답 시간",
    value: 3,
    suffix: "초",
    quote: "새벽에도 고객 문의에 즉시 답변이 가능해져서, 해외 고객 만족도가 크게 올랐습니다.",
  },
  {
    name: "포네이처스",
    role: "업무 보조형 도입",
    icon: MessageSquare,
    metric: "주간 업무 자동화",
    value: 40,
    suffix: "시간",
    quote: "반복 업무를 AI가 처리하니, 팀원들이 진짜 중요한 일에 집중할 수 있습니다.",
  },
  {
    name: "육거리소문난만두",
    role: "고객 응대형 도입",
    icon: Zap,
    metric: "월 자동 응답",
    value: 2400,
    suffix: "건",
    quote: "주문 문의, 영업시간 질문이 자동으로 해결되니 매장 운영이 한결 편해졌습니다.",
  },
];

export default function RealResults() {
  return (
    <section className="relative py-32 px-4 section-glow">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 font-mono text-sm mb-4 tracking-widest">
            REAL RESULTS
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            실제 고객 <span className="gradient-text">후기</span>
          </h2>
          <p className="text-zinc-500 text-lg">
            무펭이즘 AI 직원과 함께하는 기업들
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {customers.map((customer, i) => (
            <motion.div
              key={customer.name}
              className="glass glass-hover rounded-2xl p-8 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-purple-400">{customer.role}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <customer.icon className="w-6 h-6 text-cyan-400" />
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-zinc-500 mb-1">{customer.metric}</p>
                <p className="text-3xl font-bold gradient-text">
                  <AnimatedNumber value={customer.value} suffix={customer.suffix} />
                </p>
              </div>

              <blockquote className="text-zinc-400 text-sm leading-relaxed border-l-2 border-purple-500/30 pl-4 italic">
                &ldquo;{customer.quote}&rdquo;
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
