"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Send, CheckCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatDemoProps {
  companyName: string;
  role: string;
  roleName: string;
  roleEmoji: string;
}

export default function ChatDemo({
  companyName,
  role,
  roleName,
  roleEmoji,
}: ChatDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerEmail, setBannerEmail] = useState("");
  const [bannerSubmitted, setBannerSubmitted] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (userMessageCount >= 5 && !showBanner) {
      setShowBanner(true);
    }
  }, [userMessageCount, showBanner]);

  const streamResponse = useCallback(
    async (allMessages: Message[]) => {
      setIsStreaming(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: allMessages,
            companyName,
            role,
          }),
        });

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        let assistantText = "";

        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  assistantText += parsed.text;
                  const finalText = assistantText;
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: "assistant",
                      content: finalText,
                    };
                    return updated;
                  });
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "죄송합니다, 일시적인 오류가 발생했습니다. 다시 시도해주세요.",
          },
        ]);
      } finally {
        setIsStreaming(false);
      }
    },
    [companyName, role]
  );

  // Send initial greeting
  useEffect(() => {
    const greeting: Message = {
      role: "user",
      content: "안녕하세요, 처음 만나서 반갑습니다!",
    };
    setMessages([greeting]);
    streamResponse([greeting]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setUserMessageCount((c) => c + 1);
    inputRef.current?.focus();

    await streamResponse(newMessages);
  };

  const handleBannerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bannerEmail))
      return;

    setBannerLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: bannerEmail }),
      });
      if (res.ok) setBannerSubmitted(true);
    } catch {
      // silent fail
    } finally {
      setBannerLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden flex flex-col" style={{ height: "500px" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center text-xl">
          {roleEmoji}
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">
            {companyName} AI · {roleName} 담당
          </p>
          <p className="text-green-400 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            온라인
          </p>
        </div>
        <span className="text-xs text-zinc-500 font-mono">DEMO</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center text-sm mr-2 mt-1 shrink-0">
                  {roleEmoji}
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-purple-600/80 text-white rounded-br-md"
                    : "bg-white/5 text-zinc-200 border border-white/5 rounded-bl-md"
                }`}
              >
                {msg.content}
                {msg.role === "assistant" &&
                  i === messages.length - 1 &&
                  isStreaming &&
                  msg.content && (
                    <span className="inline-block w-1.5 h-4 bg-purple-400 ml-1 animate-pulse align-middle rounded-sm" />
                  )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator when no content yet */}
        {isStreaming && messages[messages.length - 1]?.content === "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center text-sm mr-2 mt-1 shrink-0">
              {roleEmoji}
            </div>
            <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Banner after 5 messages */}
      <AnimatePresence>
        {showBanner && !bannerSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="px-5 py-3 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-t border-purple-500/20"
          >
            <p className="text-zinc-300 text-xs mb-2">
              ✨ 이 대화가 마음에 드셨다면, 이 AI 직원을 매일 쓸 수 있습니다.
            </p>
            <form onSubmit={handleBannerSubmit} className="flex gap-2">
              <input
                type="email"
                value={bannerEmail}
                onChange={(e) => setBannerEmail(e.target.value)}
                placeholder="이메일 주소"
                className="flex-1 px-3 py-1.5 text-xs bg-white/5 border border-zinc-700 rounded-full text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 transition-all"
              />
              <button
                type="submit"
                disabled={bannerLoading}
                className="px-4 py-1.5 text-xs bg-purple-600 rounded-full text-white font-medium hover:bg-purple-500 transition-colors"
              >
                {bannerLoading ? "..." : "신청"}
              </button>
            </form>
          </motion.div>
        )}
        {showBanner && bannerSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-5 py-3 bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-t border-purple-500/20 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            <p className="text-zinc-300 text-xs">
              신청 완료! 빠른 시일 내에 연락드리겠습니다.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="px-5 py-4 border-t border-white/5 flex gap-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          disabled={isStreaming}
          className="flex-1 px-4 py-3 bg-white/5 border border-zinc-800 rounded-full text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition-colors disabled:opacity-30 disabled:hover:bg-purple-600 shrink-0"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}
