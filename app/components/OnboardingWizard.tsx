"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Building2 } from "lucide-react";
import ChatDemo from "./ChatDemo";

type Role = "news" | "support" | "assistant";

interface RoleOption {
  id: Role;
  emoji: string;
  title: string;
  desc: string;
}

const roles: RoleOption[] = [
  {
    id: "news",
    emoji: "📰",
    title: "뉴스 수집형",
    desc: "업종 뉴스를 매일 브리핑",
  },
  {
    id: "support",
    emoji: "💬",
    title: "고객 응대형",
    desc: "고객 문의에 24시간 답변",
  },
  {
    id: "assistant",
    emoji: "📋",
    title: "업무 보조형",
    desc: "일정·문서·리서치 지원",
  },
];

const roleNames: Record<Role, string> = {
  news: "뉴스 수집",
  support: "고객 응대",
  assistant: "업무 보조",
};

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [error, setError] = useState("");

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setError("회사명 또는 이름을 입력해주세요.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setTimeout(() => setStep(3), 400);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form
            key="step1"
            onSubmit={handleCompanySubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold">Step 1</p>
                <p className="text-zinc-400 text-sm">
                  회사명 또는 이름을 알려주세요
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setError("");
                }}
                placeholder="예: 무펭이즘"
                className="flex-1 px-6 py-4 bg-white/5 border border-zinc-800 rounded-full text-white placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                autoFocus
              />
              <button
                type="submit"
                className="glow-button px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                다음
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-3 pl-6">{error}</p>
            )}
          </motion.form>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-zinc-400 text-sm mb-4 text-center">
              <span className="text-purple-400 font-medium">
                {companyName}
              </span>
              에 어떤 AI 직원을 배치할까요?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`glass glass-hover rounded-2xl p-6 text-left transition-all duration-300 cursor-pointer ${
                    selectedRole === role.id
                      ? "border-purple-500/60 bg-purple-500/10"
                      : ""
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-3xl block mb-3">{role.emoji}</span>
                  <p className="text-white font-semibold mb-1">{role.title}</p>
                  <p className="text-zinc-400 text-sm">{role.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && selectedRole && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ChatDemo
              companyName={companyName}
              role={selectedRole}
              roleName={roleNames[selectedRole]}
              roleEmoji={
                roles.find((r) => r.id === selectedRole)?.emoji ?? "📋"
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
