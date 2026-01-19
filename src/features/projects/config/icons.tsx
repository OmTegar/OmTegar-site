import { AiFillHtml5 } from "@react-icons/all-files/ai/AiFillHtml5";
import { GrReactjs } from "@react-icons/all-files/gr/GrReactjs";
import { TbCloudCode } from "react-icons/tb";
import { SiLaravel } from "@react-icons/all-files/si/SiLaravel";
import { SiGnubash, SiPython } from "react-icons/si";
import { ReactNode } from "react";

// Mapping of technology keywords to their respective icons
export const TECH_ICONS: Record<string, ReactNode> = {
    "Python": <SiPython />,
    "ReactJS": <GrReactjs />,
    "Laravel": <SiLaravel />,
    "HTML": <AiFillHtml5 />,
    "CloudComputing": <TbCloudCode />,
    "BASH": <SiGnubash />,
};

// Default icon if none matches (optional)
export const DEFAULT_TECH_ICON: ReactNode = <TbCloudCode />;

export const getTechIcon = (techString: string): ReactNode => {
    // Find the first matching key in the techString
    const key = Object.keys(TECH_ICONS).find(k => techString.includes(k));
    return key ? TECH_ICONS[key] : null;
};
