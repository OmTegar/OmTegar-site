import { Metadata } from 'next';
import AboutContent from "@/features/about/components/AboutContent";

export const metadata: Metadata = {
  title: "About Me | Om.Tegar",
  description: "Learn more about Om Tegar's journey, skills, and experience as a Full Stack Developer.",
};

export default function AboutMe() {
  return (
    <AboutContent />
  );
}
