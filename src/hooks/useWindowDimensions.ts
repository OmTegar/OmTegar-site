"use client";

import { useState, useEffect } from "react";

export interface WindowDimensions {
    width: number;
    height: number;
}

/**
 * Hook to track window dimensions (SRP)
 */
export function useWindowDimensions(): WindowDimensions {
    const [dimensions, setDimensions] = useState<WindowDimensions>({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
        height: typeof window !== "undefined" ? window.innerHeight : 800,
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return dimensions;
}
