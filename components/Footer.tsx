"use client";

import React from "react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 px-6 md:px-12 py-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 tracking-[0.15em]">
                    © 2026 USAMA RIAZ — BUILT WITH OBSESSION
                </p>
                <div className="flex items-center gap-6">
                    <a
                        href="https://github.com/usamar98"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 hover:text-white tracking-[0.15em] transition-colors duration-300 hoverable"
                    >
                        GitHub
                    </a>
                    <span className="text-white/10">•</span>
                    <a
                        href="https://linkedin.com/in/usamariaz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 hover:text-white tracking-[0.15em] transition-colors duration-300 hoverable"
                    >
                        LinkedIn
                    </a>
                    <span className="text-white/10">•</span>
                    <a
                        href="https://wa.me/923328384188"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 hover:text-white tracking-[0.15em] transition-colors duration-300 hoverable"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>
        </footer>
    );
}
