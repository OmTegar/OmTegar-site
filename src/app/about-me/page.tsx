"use client";

import { Popover, Transition } from "@headlessui/react";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { GoTriangleDown } from "@react-icons/all-files/go/GoTriangleDown";
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";
import { RiFolder3Fill } from "@react-icons/all-files/ri/RiFolder3Fill";
import { SiMarkdown } from "@react-icons/all-files/si/SiMarkdown";
import { VscCollapseAll } from "@react-icons/all-files/vsc/VscCollapseAll";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { CopyBlock, nord } from "react-code-blocks";
import gearData from "@/data/GearData.json";
import { IoLogoJavascript } from "@react-icons/all-files/io5/IoLogoJavascript";

export default function AboutMe() {
  return (
    <motion.div
      className="space-y-16 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Immersive Page Header */}
      <div className="space-y-4">
        <h1 className="text-white lg:text-8xl text-5xl font-black tracking-tighter uppercase">
          STORY<span className="text-purple-500">.</span>
        </h1>
        <p className="text-[#607B96] text-lg max-w-2xl italic">
          // a glimpse into the person behind the lines of code.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: Bio Card (Bento Big) */}
        <div className="lg:col-span-8 space-y-8">
          <SectionCard title="who_am_i" icon={<RiFolder3Fill className="text-purple-400" />}>
            <div className="space-y-6">
              <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-sm leading-relaxed overflow-x-auto">
                <p><span className="text-purple-400">const</span> <span className="text-[#43D9AD]">developer</span> = {'{'}</p>
                <p className="pl-6">name: <span className="text-[#FEA55F]">'Tegar Dito Priandika'</span>,</p>
                <p className="pl-6">origin: <span className="text-[#FEA55F]">'Malang, Indonesia'</span>,</p>
                <p className="pl-6">hobbies: [<span className="text-[#FEA55F]">'Billiard', 'Networking', 'Gaming'</span>],</p>
                <p className="pl-6">motto: <span className="text-[#FEA55F]">'Pushing limits, every single commit.'</span></p>
                <p>{'}'}</p>
              </div>
              <p className="text-[#607B96] leading-relaxed">
                Passionate about building scalable web applications and high-performance network infrastructures. My journey in tech is driven by curiosity and the constant desire to master new architectures.
              </p>
            </div>
          </SectionCard>

          <SectionCard title="work_experience" icon={<IoLogoJavascript className="text-[#43D9AD]" />}>
            <div className="space-y-8">
              {[
                { company: "Kuy Group", role: "IT Support & Developer", period: "2024 - NOW" },
                { company: "Politeknik Pembangunan Pertanian Malang", role: "Back-end Developer", period: "2023 - 2024" },
                { company: "Sidigs", role: "Junior Backend Developer", period: "2021 - 2023" }
              ].map((job, i) => (
                <div key={i} className="relative pl-8 border-l border-white/10 group">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-[#43D9AD] transition-colors"></div>
                  <p className="text-xs text-[#43D9AD] font-bold mb-1 uppercase tracking-widest">{job.period}</p>
                  <h3 className="text-white text-xl font-bold">{job.company}</h3>
                  <p className="text-[#607B96] italic">{job.role}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right: Gear & Tech (Sidebar style) */}
        <div className="lg:col-span-4 space-y-8">
          <SectionCard title="my_arsenal" icon={<SiMarkdown className="text-orange-400" />}>
            <div className="space-y-6">
              {gearData.gearType.map((gear: any, i: number) => (
                <div key={i} className="space-y-3">
                  <p className="text-white/40 text-[10px] font-black tracking-widest uppercase">{gear.gear}</p>
                  <div className="flex flex-wrap gap-2">
                    {gear.gearList.map((item: any, j: number) => (
                      <span key={j} className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded-full text-white/80 hover:bg-[#43D9AD]/10 hover:border-[#43D9AD]/30 transition-all cursor-default">
                        {item.item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="relative group overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[#010810] to-transparent z-10"></div>
            <img src="setup.jpg" alt="Setup" className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="text-[10px] font-black text-white/40 mb-1 uppercase tracking-widest">command_center</p>
              <h4 className="text-white font-bold italic">Where the magic happens.</h4>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 space-y-8 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-white font-bold tracking-widest text-xs uppercase italic">_{title}</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
          <div className="w-2 h-2 rounded-full bg-white/10"></div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
