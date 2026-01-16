"use client";

import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";
import { VscTriangleUp } from "@react-icons/all-files/vsc/VscTriangleUp";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import Snake from "@/components/snake";

export default function Home() {
  const [score, setScore] = useState<number>(0);

  function handleSetScore(value: number) {
    setScore(value);
  }

  const ALLOWED_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  const [pressed, setPressed] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (ALLOWED_KEYS.includes(key) && !pressed.includes(key)) {
        setPressed((prevPressed) => [...prevPressed, key]);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;
      setPressed((prev) => prev.filter((k) => k !== key));
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressed]);

  return (
    <div className="w-full min-h-full flex items-center justify-center relative py-10">
      {/* Decorative Grid Patterns */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="grid lg:grid-cols-12 gap-12 items-center w-full relative z-10">
        {/* Left Side: Immersive Intro */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#43D9AD] font-bold tracking-[0.3em] uppercase text-sm mb-4"
            >
              // developer.portfolio_v1.0
            </motion.p>
            <h1 className="text-white lg:text-[10rem] md:text-8xl text-6xl font-black leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(67,217,173,0.1)]">
              OM.<br />TEGAR
            </h1>

            <div className="mt-8 flex items-center gap-4 text-white/90 lg:text-4xl text-2xl font-medium italic">
              <span className="text-[#FEA55F] not-italic font-black animate-pulse">_</span>
              <Typewriter
                options={{
                  loop: true,
                  autoStart: true,
                  strings: [
                    'full_stack.web(dev)',
                    'network.administrator',
                    'cloud.architect',
                    'creative.engineer'
                  ],
                  cursor: '_',
                  wrapperClassName: 'glow-text'
                }}
              />
            </div>
          </div>

          <div className="space-y-6 pt-8 max-w-xl">
            <div className="bg-white/5 border-l-2 border-[#43D9AD] p-6 backdrop-blur-md rounded-r-xl group hover:bg-[#43D9AD]/5 transition-all duration-300">
              <p className="text-[#607B96] text-lg leading-relaxed italic">
                "Sans"
              </p>
            </div>

            <div className="flex flex-col gap-3 font-mono text-sm sm:text-base">
              <p className="flex items-center gap-3">
                <span className="text-white/20">01</span>
                <span className="text-[#4D5BCE] font-bold">const</span>{" "}
                <span className="text-[#43D9AD]">skills</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-[#FEA55F]">['PHP', 'Cloud', 'Network', 'NextJS']</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-white/20">02</span>
                <span className="text-[#4D5BCE] font-bold">const</span>{" "}
                <span className="text-[#43D9AD]">availability</span>{" "}
                <span className="text-white">=</span>{" "}
                <span className="text-[#FEA55F]">'OPEN_FOR_OPPORTUNITIES'</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Tech Module */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center lg:items-end">
          <motion.div
            className="w-full max-w-[480px] group relative"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Holographic Glow behind game */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-[#43D9AD]/20 to-purple-500/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="border border-white/10 bg-[#011221]/60 backdrop-blur-[40px] rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group-hover:border-[#43D9AD]/40 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="text-[10px] text-white/20 font-black tracking-widest uppercase">system.module_0x71</div>
              </div>

              {/* Game Area */}
              <div className="bg-[#000]/40 rounded-2xl p-4 mb-8 border border-white/5 shadow-inner">
                <Snake scoreSnake={handleSetScore} />
              </div>

              {/* Game Controls & Score */}
              <div className="flex items-center justify-between bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-white/30">current_score</p>
                    <p className="text-3xl font-black text-[#43D9AD] glow-text leading-none">{score}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-1">
                    <VscTriangleUp className={`p-1 border border-white/10 rounded-md transition-all ${pressed.includes("ArrowUp") ? "bg-[#43D9AD] text-black" : "text-white/40"}`} />
                    <div className="col-start-1">
                      <VscTriangleUp className={`p-1 border border-white/10 rounded-md -rotate-90 transition-all ${pressed.includes("ArrowLeft") ? "bg-[#43D9AD] text-black" : "text-white/40"}`} />
                    </div>
                    <div>
                      <VscTriangleUp className={`p-1 border border-white/10 rounded-md rotate-180 transition-all ${pressed.includes("ArrowDown") ? "bg-[#43D9AD] text-black" : "text-white/40"}`} />
                    </div>
                    <div>
                      <VscTriangleUp className={`p-1 border border-white/10 rounded-md rotate-90 transition-all ${pressed.includes("ArrowRight") ? "bg-[#43D9AD] text-black" : "text-white/40"}`} />
                    </div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <div className="w-16 h-16 rounded-full border border-[#43D9AD]/30 flex items-center justify-center relative mb-4">
                    <div className="absolute inset-2 rounded-full border border-dashed border-[#43D9AD]/50 animate-spin"></div>
                    <span className="text-[10px] font-black text-[#43D9AD]">ACTIVE</span>
                  </div>
                  <p className="text-[10px] text-white/30 leading-tight">SYSTEM<br />MONITOR</p>
                </div>
              </div>
            </div>

            {/* Action buttons floating near game */}
            <div className="absolute -bottom-6 -right-6 flex flex-col gap-2">
              <motion.button
                whileHover={{ x: -10 }}
                className="bg-white text-black font-black text-xs px-6 py-3 rounded-full flex items-center gap-2 shadow-xl"
              >
                _START_SYSTEM
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
