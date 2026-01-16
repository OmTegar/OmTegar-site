"use client";

import React from "react";
import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-full text-white">
      <h2 className="text-4xl mb-4 text-[#E99287]">404 - Not Found</h2>
      <p className="text-[#607B96] mb-8">Could not find requested resource</p>
      <Link href="/" className="bg-[#1C2B3A] px-6 py-3 rounded-lg hover:shadow-sm hover:shadow-[#607B96] transition-all">
        Return Home
      </Link>
    </div>
  );
}
