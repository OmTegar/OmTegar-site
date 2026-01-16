"use client";

import { Dialog, Transition } from "@headlessui/react";
import { AiFillHtml5 } from "@react-icons/all-files/ai/AiFillHtml5";
import { BsFiles } from "@react-icons/all-files/bs/BsFiles";
import { GrReactjs } from "@react-icons/all-files/gr/GrReactjs";
import { TbCloudCode } from "react-icons/tb";
import { SiLaravel } from "@react-icons/all-files/si/SiLaravel";
import { motion, AnimatePresence } from "framer-motion";
import React, { Fragment, useState, ReactNode } from "react";
import { SiGnubash, SiPython } from "react-icons/si";
import datas from "@/data/ProjectData.json";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  repo?: string;
  technology: string;
}

const projectData = datas as Project[];

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const filteredProjects = filter === "All"
    ? projectData
    : projectData.filter((data) => data.technology === filter);

  return (
    <motion.div
      className="space-y-12 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Immersive Page Header */}
      <div className="space-y-4">
        <h1 className="text-white lg:text-8xl text-5xl font-black tracking-tighter">
          PROJECTS<span className="text-[#43D9AD]">.</span>
        </h1>
        <p className="text-[#607B96] text-lg max-w-2xl italic">
          // exploring the digital frontier through code and architecture.
        </p>
      </div>

      {/* Futuristic Filter Dock */}
      <div className="flex flex-wrap gap-3 items-center">
        {[
          { id: "All", label: "all_works" },
          { id: "ReactJS", label: "react.js" },
          { id: "Laravel", label: "laravel" },
          { id: "Python", label: "python" },
          { id: "CloudComputing", label: "cloud" },
          { id: "BASH", label: "bash" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${filter === item.id
              ? "bg-[#43D9AD] text-[#010810] border-[#43D9AD] shadow-[0_0_20px_rgba(67,217,173,0.3)]"
              : "bg-white/5 text-[#607B96] border-white/10 hover:border-white/30 hover:text-white"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Bento-style Project Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center text-white/20 font-black text-4xl"
            >
              MODULE_NOT_FOUND
            </motion.div>
          ) : (
            filteredProjects.map((data, index) => (
              <motion.div
                key={data.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card data={data} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface CardProps {
  data: Project;
}

const Card: React.FC<CardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateIcon = (value: string): ReactNode => {
    if (value.includes("Python")) return <SiPython />;
    if (value.includes("ReactJS")) return <GrReactjs />;
    if (value.includes("HTML")) return <AiFillHtml5 />;
    if (value.includes("CloudComputing")) return <TbCloudCode />;
    if (value.includes("BASH")) return <SiGnubash />;
    return null;
  };

  return (
    <>
      <motion.div
        className="rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm flex items-center flex-col overflow-hidden hover:border-[#43D9AD]/30 hover:shadow-[0_0_20px_rgba(67,217,173,0.15)] transition-all duration-300 h-[400px]"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="overflow-hidden h-[80%] w-full relative ">
          <img
            src={data.image}
            alt={data.title}
            className="object-cover h-full w-full"
          />
          <div className="absolute top-5 right-5 text-lg rounded-[2px] flex gap-2.5">
            <div className="bg-[#86E1F9] p-1 rounded-md">
              {generateIcon(data.technology)}
            </div>
          </div>
        </div>

        <div className="py-6 px-8 text-[#607B96] w-full flex flex-col justify-between h-auto">
          <div>
            <h6 className="mb-2.5 text-white line-clamp-1">{data.title}</h6>
            <p className="mb-5 line-clamp-2 text-sm">{data.description}</p>
          </div>
          <motion.button
            className="bg-[#1b2b3a] text-white py-2.5 px-3.5 rounded-lg w-max"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            view-project
          </motion.button>
        </div>
      </motion.div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 backdrop-blur-0"
            enterTo="opacity-100 backdrop-blur-sm"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 backdrop-blur-sm"
            leaveTo="opacity-0 backdrop-blur-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-[#1d2a3a] text-left align-middle shadow-xl transition-all">
                  <div className="h-96">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <article className="p-5 ">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-semibold leading-6 mb-2.5 text-white"
                    >
                      {data.title}
                    </Dialog.Title>
                    <p className="mb-2.5 text-white/80">{data.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {data.link && (
                          <a
                            href={data.link}
                            target="_blank"
                            className="text-white/80 hover:text-white underline transition-colors"
                            rel="noreferrer"
                          >
                            {data.technology.includes("CloudComputing") ? "View In Youtube" :
                              data.technology.includes("BASH") ? "Go to Github" : "Demo"}
                          </a>
                        )}
                        {data.repo && (
                          <>
                            <span className="text-white/50">|</span>
                            <a
                              href={data.repo}
                              target="_blank"
                              className="text-white/80 hover:text-white underline transition-colors"
                              rel="noreferrer"
                            >
                              Repo
                            </a>
                          </>
                        )}
                      </div>
                      <p className="text-white/80 text-sm">
                        Stack: {data.technology}
                      </p>
                    </div>
                  </article>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
