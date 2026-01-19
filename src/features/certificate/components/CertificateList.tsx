"use client";

import { Dialog, Transition } from "@headlessui/react";
import { FaNetworkWired, FaCode, FaAws } from "react-icons/fa";
import { MdOutlineSportsGymnastics, MdSchool } from "react-icons/md";
import { GiIdea } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import React, { Fragment, useState, ReactNode } from "react";
import datas from "@/data/CertificateData.json";

interface Certificate {
    title: string;
    description: string;
    image: string;
    link: string;
    technology: string[];
}

const certificateData = datas as Certificate[];

export default function CertificateList() {
    const [filter, setFilter] = useState<string>("all");

    const filteredCertificates = filter === "all"
        ? certificateData
        : certificateData.filter((data) => data.technology.includes(filter));

    return (
        <motion.div
            className="space-y-12 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Immersive Page Header */}
            <div className="space-y-4">
                <h1 className="text-white lg:text-8xl text-5xl font-black tracking-tighter uppercase">
                    ACHIEVEMENTS<span className="text-[#FEA55F]">.</span>
                </h1>
                <p className="text-[#607B96] text-lg max-w-2xl italic">
          // documenting the journey of continuous learning and growth.
                </p>
            </div>

            {/* Futuristic Filter Dock */}
            <div className="flex flex-wrap gap-3 items-center">
                {[
                    { id: "all", label: "all_certs" },
                    { id: "Networking", label: "networking" },
                    { id: "Programing", label: "programming" },
                    { id: "CloudComputing", label: "cloud" },
                    { id: "school", label: "academic" },
                    { id: "BusinessIdeas", label: "business" },
                    { id: "Sports", label: "sports" },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setFilter(item.id)}
                        className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all border ${filter === item.id
                            ? "bg-[#FEA55F] text-[#010810] border-[#FEA55F] shadow-[0_0_20px_rgba(254,165,95,0.3)]"
                            : "bg-white/5 text-[#607B96] border-white/10 hover:border-white/30 hover:text-white"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Bento-style Certificate Grid */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredCertificates.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-20 text-center text-white/20 font-black text-4xl"
                        >
                            RECORD_NULL
                        </motion.div>
                    ) : (
                        filteredCertificates.map((data, index) => (
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
    data: Certificate;
}

const Card: React.FC<CardProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const generateIcon = (value: string): ReactNode => {
        if (value.includes("Programing")) return <FaCode />;
        if (value.includes("Networking")) return <FaNetworkWired />;
        if (value.includes("CloudComputing")) return <FaAws />;
        if (value.includes("BusinessIdeas")) return <GiIdea />;
        if (value.includes("Sports")) return <MdOutlineSportsGymnastics />;
        if (value.includes("school")) return <MdSchool />;
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
                    <div className="absolute top-5 right-5 flex">
                        {data.technology.map((tech, index) => (
                            <div
                                className="bg-[#86E1F9] p-1 rounded-md"
                                key={index}
                                style={{
                                    marginRight: index < data.technology.length - 1 ? "4px" : "0",
                                }}
                            >
                                {generateIcon(tech)}
                            </div>
                        ))}
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
                        view-certificate
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
                                            <a
                                                href={`https://omtegar.vercel.app/certificate/${data.link}`}
                                                target="_blank"
                                                className="text-white/80 hover:text-white underline transition-colors"
                                                rel="noreferrer"
                                            >
                                                View In New Tab
                                            </a>
                                            <p className="text-white/80 text-sm">
                                                Type: {data.technology.join(", ")}
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
