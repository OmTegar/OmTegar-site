import { Metadata } from 'next';
import HomeHero from "@/features/home/components/HomeHero";

export const metadata: Metadata = {
  title: "Om.Tegar | Full Stack Developer & Network Engineer",
  description: "Portfolio of Om Tegar, a Full Stack Developer, Network Administrator, and Cloud Architect. Specializing in Next.js, PHP, and Cloud Infrastructure.",
  keywords: ["Om Tegar", "Tegar", "Full Stack Developer", "Network Engineer", "Next.js", "React", "Cloud Architect", "Portfolio"],
  openGraph: {
    title: "Om.Tegar | Full Stack Developer",
    description: "Portfolio of Om Tegar - Building the future of web and infrastructure.",
    url: "https://omtegar.vercel.app",
    siteName: "Om Tegar Portfolio",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om.Tegar | Full Stack Developer",
    description: "Portfolio of Om Tegar - Building the future of web and infrastructure.",
    images: ["/thumbnail.png"],
  },
};

export default function Home() {
  return (
    <HomeHero />
  );
}
