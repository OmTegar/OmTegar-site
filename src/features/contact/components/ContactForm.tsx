"use client";

import { emailService, EmailData } from "@/features/contact/services/EmailService";
import { FiInstagram } from "@react-icons/all-files/fi/FiInstagram";
import { GrLinkedinOption } from "@react-icons/all-files/gr/GrLinkedinOption";
import { AiFillYoutube } from "@react-icons/all-files/ai/AiFillYoutube";
import { MdCall } from "@react-icons/all-files/md/MdCall";
import { MdEmail } from "@react-icons/all-files/md/MdEmail";
import { motion } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

export default function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [loader, setLoader] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const [formData, setFormData] = useState<EmailData>({
        from_name: "",
        message: "",
        email: "",
    });

    const sendEmail = async (e: FormEvent) => {
        e.preventDefault();
        setLoader(true);
        try {
            await emailService.sendEmail(formData);
            setLoader(false);
            setShowNotif(true);
            setTimeout(() => setShowNotif(false), 3000);
            if (formRef.current) formRef.current.reset();
        } catch (error) {
            setLoader(false);
            alert("Failed to send message. Please try again later.");
        }
    };

    return (
        <motion.div
            className="space-y-12 pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Immersive Page Header */}
            <div className="space-y-4">
                <h1 className="text-white lg:text-8xl text-5xl font-black tracking-tighter uppercase">
                    CONTACT<span className="text-[#43D9AD]">.</span>
                </h1>
                <p className="text-[#607B96] text-lg max-w-2xl italic">
          // establishing connection to the external world.
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
                {/* Left: Communication Form */}
                <div className="lg:col-span-7">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#43D9AD]/5 blur-3xl rounded-full translate-x-12 -translate-y-12"></div>

                        <form onSubmit={sendEmail} ref={formRef} className="space-y-8 relative z-10">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#43D9AD] uppercase tracking-widest">_identity</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        onChange={(e) => setFormData({ ...formData, from_name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#43D9AD]/50 focus:ring-1 focus:ring-[#43D9AD]/50 transition-all font-mono"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-[#43D9AD] uppercase tracking-widest">_protocol</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#43D9AD]/50 focus:ring-1 focus:ring-[#43D9AD]/50 transition-all font-mono"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#43D9AD] uppercase tracking-widest">_data_stream</label>
                                <textarea
                                    rows={5}
                                    placeholder="Type your transmission..."
                                    required
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#43D9AD]/50 focus:ring-1 focus:ring-[#43D9AD]/50 transition-all font-mono resize-none"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={loader}
                                    className="bg-white text-[#010810] font-black uppercase text-xs tracking-widest px-8 py-4 rounded-full flex items-center gap-3 hover:bg-[#43D9AD] transition-all shadow-xl disabled:opacity-50"
                                >
                                    {loader ? "TRANSMITTING..." : "SEND_MESSAGE"}
                                    <div className="w-2 h-2 rounded-full bg-[#010810] animate-pulse"></div>
                                </button>

                                {showNotif && (
                                    <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-[#43D9AD] text-xs font-mono italic">
                                        {">> "} TRANSMISSION_SUCCESS
                                    </motion.p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right: Connectivity Hub */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#43D9AD] animate-ping"></div>
                            <span className="text-white font-black text-[10px] uppercase tracking-widest">_connectivity_hub</span>
                        </div>

                        <div className="space-y-4">
                            {[
                                { icon: <MdEmail />, label: "Email", value: "tegardito02@gmail.com", href: "mailto:tegardito02@gmail.com" },
                                { icon: <FiInstagram />, label: "Instagram", value: "@tega_r.dp", href: "https://instagram.com/tega_r.dp" },
                                { icon: <GrLinkedinOption />, label: "LinkedIn", value: "Tegar Priandika", href: "https://linkedin.com/in/omtegar" },
                                { icon: <MdCall />, label: "Call", value: "+62 812-3321-9130", href: "tel:+6281233219130" },
                                { icon: <AiFillYoutube />, label: "YouTube", value: "TechPoisonIndonesian", href: "https://youtube.com/@TechPoisonIndonesian" },
                            ].map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 p-4 grayscale hover:grayscale-0 bg-white/5 border border-white/5 rounded-2xl hover:border-[#43D9AD]/30 hover:bg-[#43D9AD]/5 transition-all group"
                                >
                                    <div className="text-2xl text-white/40 group-hover:text-[#43D9AD] transition-colors">
                                        {link.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">{link.label}</p>
                                        <p className="text-white font-medium text-sm">{link.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social Presence Mini Card */}
                    <div className="p-8 bg-gradient-to-br from-[#1E2D3D] to-[#010810] rounded-[2.5rem] border border-white/5 flex items-center justify-between">
                        <div>
                            <h4 className="text-white font-black text-xl leading-none">OM.<br />HUB</h4>
                            <p className="text-[10px] text-[#607B96] mt-2 uppercase font-bold tracking-widest">uptime: 99.9%</p>
                        </div>
                        <div className="w-12 h-12 bg-[#43D9AD] rounded-full flex items-center justify-center text-[#010810] text-2xl font-black">
                            !
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
