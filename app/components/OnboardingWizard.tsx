"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Mail,
  Briefcase,
} from "lucide-react";

type Role = "news" | "support" | "assistant";
type Channel = "discord" | "telegram" | "slack";

interface FormData {
  companyName: string;
  industry: string;
  email: string;
  role: Role | null;
  channel: Channel | null;
  channelInfo: string;
}

const industries = [
  "외식업",
  "여행/관광",
  "교육",
  "IT/개발",
  "미디어",
  "제조업",
  "기타",
];

const roles: { id: Role; emoji: string; title: string; desc: string }[] = [
  {
    id: "news",
    emoji: "📰",
    title: "뉴스 브리핑",
    desc: "업계 뉴스를 매일 정리해드립니다",
  },
  {
    id: "support",
    emoji: "💬",
    title: "고객 응대",
    desc: "고객 문의에 즉시 답변합니다",
  },
  {
    id: "assistant",
    emoji: "📋",
    title: "업무 보조",
    desc: "일정, 문서, 리서치를 도와드립니다",
  },
];

const roleNames: Record<Role, string> = {
  news: "뉴스 브리핑",
  support: "고객 응대",
  assistant: "업무 보조",
};

const channels: {
  id: Channel;
  emoji: string;
  title: string;
  placeholder: string;
}[] = [
  {
    id: "discord",
    emoji: "💬",
    title: "디스코드",
    placeholder: "서버 초대링크 또는 서버명",
  },
  {
    id: "telegram",
    emoji: "✈️",
    title: "텔레그램",
    placeholder: "텔레그램 ID (@username)",
  },
  {
    id: "slack",
    emoji: "💼",
    title: "슬랙",
    placeholder: "워크스페이스 URL",
  },
];

const channelNames: Record<Channel, string> = {
  discord: "디스코드",
  telegram: "텔레그램",
  slack: "슬랙",
};

const slideVariants = {
  enter: { opacity: 0, x: 60 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
};

function DeployLog({
  formData,
}: {
  formData: FormData;
}) {
  const [lines, setLines] = useState<{ text: string; done: boolean }[]>([]);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [apiSent, setApiSent] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const roleName = formData.role ? roleNames[formData.role] : "";
  const channelName = formData.channel ? channelNames[formData.channel] : "";

  const logSteps = [
    "에이전트 프로필 생성 중...",
    "SOUL.md 초기화 완료",
    `${roleName} 스킬팩 설치 중...`,
    "기억 시스템 구성 완료",
    `${channelName} 채널 연동 중...`,
    "보안 정책 적용 완료",
    "최종 테스트 실행 중...",
    "배포 완료!",
  ];

  // Send API request once
  useEffect(() => {
    if (apiSent) return;
    setApiSent(true);

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        companyName: formData.companyName,
        industry: formData.industry,
        role: formData.role ? roleNames[formData.role] : "",
        channel: formData.channel ? channelNames[formData.channel] : "",
        channelInfo: formData.channelInfo,
      }),
    }).catch(() => {
      // silent — UX continues regardless
    });
  }, [apiSent, formData]);

  // Animate deploy log
  useEffect(() => {
    let stepIndex = 0;

    // Initialize all lines as pending
    setLines(logSteps.map((text) => ({ text, done: false })));

    intervalRef.current = setInterval(() => {
      if (stepIndex < logSteps.length) {
        setLines((prev) =>
          prev.map((line, i) =>
            i === stepIndex ? { ...line, done: true } : line
          )
        );
        setProgress(((stepIndex + 1) / logSteps.length) * 100);
        stepIndex++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCompleted(true);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Terminal card */}
      <div className="rounded-2xl overflow-hidden border border-white/10">
        {/* Terminal header */}
        <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-zinc-500 text-xs font-mono ml-2">
            mupengism-deploy
          </span>
        </div>

        {/* Terminal body */}
        <div className="bg-[#111] p-5 font-mono text-sm space-y-2 min-h-[280px]">
          <p className="text-zinc-500 text-xs mb-3">
            $ mupengism deploy --agent {formData.role} --channel{" "}
            {formData.channel}
          </p>

          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: line.done ? 1 : 0.2,
                x: line.done ? 0 : -10,
              }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              {line.done ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                  }}
                  className={
                    i === lines.length - 1 ? "text-yellow-400" : "text-green-400"
                  }
                >
                  {i === lines.length - 1 ? "🎉" : "✅"}
                </motion.span>
              ) : (
                <span className="text-zinc-600">○</span>
              )}
              <span
                className={
                  line.done
                    ? i === lines.length - 1
                      ? "text-yellow-300 font-semibold"
                      : "text-zinc-200"
                    : "text-zinc-600"
                }
              >
                {line.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-[#111] px-5 pb-4">
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-zinc-500 text-xs mt-2 text-right font-mono">
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Success card */}
      <AnimatePresence>
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="glass rounded-2xl p-8 text-center border border-purple-500/30"
            style={{
              boxShadow: "0 0 40px rgba(168, 85, 247, 0.15)",
            }}
          >
            <motion.p
              className="text-4xl mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              🐧
            </motion.p>
            <h3 className="text-xl font-bold text-white mb-3">
              <span className="gradient-text">{formData.companyName}</span>의 AI
              직원이 준비되었습니다!
            </h3>
            <div className="space-y-1.5 text-zinc-400 text-sm">
              <p>
                담당 매니저가{" "}
                <span className="text-purple-400 font-medium">
                  {channelName}
                </span>
                으로 10분 내 연락드립니다.
              </p>
              <p>세팅이 완료되면 바로 대화를 시작하실 수 있습니다.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industry: "",
    email: "",
    role: null,
    channel: null,
    channelInfo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    },
    []
  );

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim())
      newErrors.companyName = "회사명/이름을 입력해주세요.";
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일을 입력해주세요.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleRoleSelect = (role: Role) => {
    updateField("role", role);
    setTimeout(() => setStep(3), 300);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.channel) {
      setErrors({ channel: "채널을 선택해주세요." });
      return;
    }
    if (!formData.channelInfo.trim()) {
      setErrors({ channelInfo: "연결 정보를 입력해주세요." });
      return;
    }
    setStep(4);
  };

  const stepLabels = ["기본 정보", "AI 직원 선택", "연결 채널", "배포"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {stepLabels.map((label, i) => {
          const num = i + 1;
          const isActive = step === num;
          const isCompleted = step > num;
          return (
            <div key={num} className="flex items-center gap-2">
              {i > 0 && (
                <div
                  className={`w-8 h-px transition-colors duration-300 ${
                    isCompleted ? "bg-purple-500" : "bg-zinc-700"
                  }`}
                />
              )}
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white scale-110"
                      : isCompleted
                        ? "bg-purple-500/30 text-purple-300 border border-purple-500/50"
                        : "bg-white/5 text-zinc-600 border border-zinc-800"
                  }`}
                >
                  {isCompleted ? "✓" : num}
                </div>
                <span
                  className={`text-xs hidden sm:inline transition-colors duration-300 ${
                    isActive
                      ? "text-white font-medium"
                      : isCompleted
                        ? "text-purple-400"
                        : "text-zinc-600"
                  }`}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <motion.form
            key="step1"
            onSubmit={handleStep1Submit}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold">기본 정보</p>
                <p className="text-zinc-400 text-sm">
                  AI 직원 배포를 위한 정보를 입력해주세요
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Company name */}
              <div>
                <label className="text-zinc-400 text-sm mb-1.5 block">
                  회사명 / 이름 <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      updateField("companyName", e.target.value)
                    }
                    placeholder="예: 무펭이즘"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                    autoFocus
                  />
                </div>
                {errors.companyName && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Industry */}
              <div>
                <label className="text-zinc-400 text-sm mb-1.5 block">
                  업종
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-zinc-900">
                      선택해주세요
                    </option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind} className="bg-zinc-900">
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-zinc-400 text-sm mb-1.5 block">
                  연락받을 이메일 <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              다음
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        )}

        {/* STEP 2: Choose Role */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white font-semibold">AI 직원 선택</p>
                  <p className="text-zinc-400 text-sm">
                    <span className="text-purple-400 font-medium">
                      {formData.companyName}
                    </span>
                    에 어떤 AI 직원을 배치할까요?
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 text-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  이전
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    onClick={() => handleRoleSelect(role.id)}
                    className={`relative rounded-2xl p-6 text-left transition-all duration-300 cursor-pointer border bg-white/[0.03] backdrop-blur-sm ${
                      formData.role === role.id
                        ? "border-purple-500/60 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        : "border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06]"
                    }`}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-3xl block mb-3">{role.emoji}</span>
                    <p className="text-white font-semibold mb-1">
                      {role.title}
                    </p>
                    <p className="text-zinc-400 text-sm">{role.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Choose Channel */}
        {step === 3 && (
          <motion.form
            key="step3"
            onSubmit={handleStep3Submit}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white font-semibold">연결 채널</p>
                  <p className="text-zinc-400 text-sm">
                    AI 직원이 활동할 채널을 선택해주세요
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 text-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  이전
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {channels.map((ch) => (
                  <motion.button
                    key={ch.id}
                    type="button"
                    onClick={() => {
                      updateField("channel", ch.id);
                      updateField("channelInfo", "");
                    }}
                    className={`relative rounded-2xl p-5 text-center transition-all duration-300 cursor-pointer border bg-white/[0.03] backdrop-blur-sm ${
                      formData.channel === ch.id
                        ? "border-purple-500/60 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        : "border-white/10 hover:border-purple-500/30 hover:bg-white/[0.06]"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl block mb-2">{ch.emoji}</span>
                    <p className="text-white font-semibold text-sm">
                      {ch.title}
                    </p>
                  </motion.button>
                ))}
              </div>

              {errors.channel && (
                <p className="text-red-400 text-xs mb-4">{errors.channel}</p>
              )}

              {/* Channel info input */}
              <AnimatePresence>
                {formData.channel && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6"
                  >
                    <label className="text-zinc-400 text-sm mb-1.5 block">
                      {
                        channels.find((c) => c.id === formData.channel)
                          ?.title
                      }{" "}
                      연결 정보
                    </label>
                    <input
                      type="text"
                      value={formData.channelInfo}
                      onChange={(e) =>
                        updateField("channelInfo", e.target.value)
                      }
                      placeholder={
                        channels.find((c) => c.id === formData.channel)
                          ?.placeholder
                      }
                      className="w-full px-4 py-3.5 bg-white/5 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                      autoFocus
                    />
                    {errors.channelInfo && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.channelInfo}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                🚀 AI 직원 배포하기
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 4: Deploy */}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <DeployLog formData={formData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
