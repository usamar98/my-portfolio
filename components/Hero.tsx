"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const subtitles = [
    "Full Stack Developer.",
    "AI Automation.",
    "Web3.",
];

export default function Hero() {
    const [displayText, setDisplayText] = useState("");
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [time, setTime] = useState("");

    // Live Pakistan time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date().toLocaleTimeString("en-US", {
                timeZone: "Asia/Karachi",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(now);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Typewriter effect
    useEffect(() => {
        const current = subtitles[subtitleIndex];

        const timeout = setTimeout(
            () => {
                if (!isDeleting) {
                    setDisplayText(current.substring(0, charIndex + 1));
                    setCharIndex((prev) => prev + 1);

                    if (charIndex + 1 === current.length) {
                        setTimeout(() => setIsDeleting(true), 2000);
                    }
                } else {
                    setDisplayText(current.substring(0, charIndex - 1));
                    setCharIndex((prev) => prev - 1);

                    if (charIndex - 1 === 0) {
                        setIsDeleting(false);
                        setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
                    }
                }
            },
            isDeleting ? 40 : 80
        );

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, subtitleIndex]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const childVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        },
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center z-10"
            >
                {/* Main Name */}
                <motion.div variants={childVariants} className="overflow-hidden">
                    <h1
                        className="font-[family-name:var(--font-playfair)] text-[10vw] leading-[0.9] font-bold text-white clip-reveal hero-name"
                    >
                        USAMA
                        <br />
                        RIAZ
                    </h1>
                </motion.div>

                {/* Typewriter Subtitle */}
                <motion.div
                    variants={childVariants}
                    className="mt-8 flex items-center justify-center"
                >
                    <span className="font-[family-name:var(--font-jetbrains)] text-[13px] md:text-sm text-white/60 tracking-[0.15em]">
                        {displayText}
                    </span>
                    <span className="typewriter-cursor font-[family-name:var(--font-jetbrains)] text-white/60 ml-[2px]">
                        |
                    </span>
                </motion.div>
            </motion.div>

            {/* Bottom Left — Time + Available */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-8 left-6 md:left-12 flex flex-col gap-2"
            >
                <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/40 tracking-widest uppercase">
                    Karachi, PK — {time}
                </span>
                <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/60 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white pulse-dot" />
                    Available for Work
                </span>
            </motion.div>

            {/* Bottom Right — Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="absolute bottom-8 right-6 md:right-12 flex flex-col items-center gap-2"
            >
                <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/40 tracking-[0.3em] uppercase">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                    <svg
                        width="12"
                        height="24"
                        viewBox="0 0 12 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 0L6 22M6 22L1 17M6 22L11 17"
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="1"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
