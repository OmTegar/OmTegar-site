/* eslint-disable jsx-a11y/anchor-is-valid */
"use client";

import { AiFillInstagram } from "@react-icons/all-files/ai/AiFillInstagram";
import { AiFillYoutube } from "@react-icons/all-files/ai/AiFillYoutube";
import { AiOutlineGithub } from "@react-icons/all-files/ai/AiOutlineGithub";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // For toggle navbar on mobile
  const [navbar, setNavbar] = useState(false);
  const { height } = useWindowDimensions();
  const pathname = usePathname();

  useEffect(() => {
    if (height > 768) {
      setNavbar(false);
    }
  }, [height]);

  return (
    <div className="min-h-screen w-full bg-[#010810] text-[#607B96] relative overflow-hidden selection:bg-[#43D9AD]/30 selection:text-white">
      {/* Immersive Background Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#43D9AD]/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#FEA55F]/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen h-screen">
        {/* Floating Futuristic Header */}
        <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
          <nav className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-white font-black text-xl tracking-tighter hover:scale-105 transition-transform">
                OM.TEGAR
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {[
                  { href: "/", label: "_hello" },
                  { href: "/about-me", label: "_about" },
                  { href: "/projects", label: "_work" },
                  { href: "/certificate", label: "_certs" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-full transition-all text-sm font-medium ${pathname === link.href
                      ? "bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                      : "hover:bg-white/5 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/contact-me"
                className={`hidden md:block px-6 py-2 rounded-full text-sm font-bold transition-all ${pathname === "/contact-me"
                  ? "bg-[#43D9AD] text-[#010810] shadow-[0_0_20px_rgba(67,217,173,0.4)]"
                  : "bg-white/10 text-white hover:bg-[#43D9AD] hover:text-[#010810] hover:shadow-[0_0_20px_rgba(67,217,173,0.3)]"
                  }`}
              >
                _let's_chat
              </Link>

              <button
                className="md:hidden text-2xl text-white p-2"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? <AiOutlineClose /> : <FiMenu />}
              </button>
            </div>
          </nav>
        </header>

        {/* Dynamic Mobile Menu Overlay */}
        <AnimatePresence>
          {navbar && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[60] bg-[#010810]/95 backdrop-blur-2xl p-8 flex flex-col justify-center gap-8 md:hidden"
            >
              {[
                { href: "/", label: "_hello" },
                { href: "/about-me", label: "_about-me" },
                { href: "/projects", label: "_projects" },
                { href: "/certificate", label: "_certs" },
                { href: "/contact-me", label: "_contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setNavbar(false)}
                  className="text-4xl font-black text-white hover:text-[#43D9AD] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <AiOutlineClose
                className="absolute top-8 right-8 text-4xl text-white cursor-pointer"
                onClick={() => setNavbar(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area: Re-layout as a clean canvas */}
        {/* Changed max-w-7xl to max-w-[90%] and added scrollbar hiding utils */}
        <main className="flex-grow pt-32 pb-24 md:px-12 px-6 max-w-[90%] mx-auto w-full flex flex-col overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Minimalist Floating Footer Pill */}
        <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 shadow-[0_-8px_32px_rgba(0,0,0,0.3)]">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 hidden sm:block">connect</span>
            <div className="w-[1px] h-4 bg-white/10 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              {[
                { icon: <AiOutlineGithub />, href: "https://github.com/OmTegar" },
                { icon: <AiFillInstagram />, href: "https://instagram.com/tega_r.dp" },
                { icon: <FaFacebookF />, href: "https://facebook.com/tegar.dito.9" },
                { icon: <AiFillYoutube />, href: "https://youtube.com/@TechPoisonIndonesian" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full text-white/60 hover:text-[#43D9AD] hover:bg-white/5 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
