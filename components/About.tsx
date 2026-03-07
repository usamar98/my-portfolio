"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

interface CounterProps {
    target: number;
    suffix: string;
    label: string;
}

function Counter({ target, suffix, label }: CounterProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, target]);

    return (
        <div ref={ref} className="text-center md:text-left">
            <span className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white">
                {count}
                {suffix}
            </span>
            <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/40 uppercase tracking-[0.2em] mt-2">
                {label}
            </p>
        </div>
    );
}

const stats = [
    { target: 5, suffix: "+", label: "Years Experience" },
    { target: 50, suffix: "+", label: "Projects Delivered" },
    { target: 3, suffix: "", label: "SaaS Built" },
    { target: 10, suffix: "+", label: "Automations" },
];

const marqueeItems = [
    "NEXT.JS",
    "REACT",
    "GHL",
    "AI AUTOMATION",
    "WEB3",
    "NODE.JS",
    "TYPESCRIPT",
    "FRAMER",
];

export default function About() {
    return (
        <section id="about" className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                    {/* Left — Image + Counters */}
                    <RevealOnScroll>
                        <div className="flex flex-col gap-12">
                            {/* Personal Image */}
                            <div className="relative group">
                                <div className="relative w-full aspect-[3/4] max-w-[400px] mx-auto md:mx-0 overflow-hidden">
                                    {/* Decorative border frame */}
                                    <div className="absolute -inset-3 border border-white/10 z-0" />
                                    {/* Corner accents */}
                                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-white/30 z-10" />
                                    <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-white/30 z-10" />
                                    <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-white/30 z-10" />
                                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-white/30 z-10" />

                                    <Image
                                        src="/projects/my img6.jpeg"
                                        alt="Usama Riaz"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                        sizes="(max-width: 768px) 90vw, 400px"
                                    />

                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Floating label */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5, duration: 0.6 }}
                                        className="absolute bottom-4 left-4 z-10"
                                    >
                                        <span className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/50 uppercase tracking-[0.3em]">
                                            Est. 2020
                                        </span>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Counters */}
                            <div className="grid grid-cols-2 gap-8 md:gap-12">
                                {stats.map((stat) => (
                                    <Counter
                                        key={stat.label}
                                        target={stat.target}
                                        suffix={stat.suffix}
                                        label={stat.label}
                                    />
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Right — Bio */}
                    <RevealOnScroll delay={0.2}>
                        <div className="flex flex-col justify-center">
                            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 uppercase tracking-[0.3em] mb-4">
                                About
                            </p>
                            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                                Crafting
                                <br />
                                Digital
                                <br />
                                <span className="text-white/40">Experiences.</span>
                            </h2>
                            <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl leading-relaxed text-white/90">
                                I build digital products that work. Web apps, AI automations,
                                booking systems.
                            </p>
                            <p className="font-[family-name:var(--font-jetbrains)] text-sm text-white/40 mt-6 leading-relaxed">
                                Based in Gujranwala, working globally. Every project is an
                                obsession — from first pixel to final deploy. I don&apos;t build
                                templates. I build experiences.
                            </p>

                            {/* Signature-style list */}
                            <div className="mt-10 space-y-3 border-t border-white/10 pt-8">
                                {["Full Stack Development", "AI & Automation", "GHL Expert", "Web3 Builder"].map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
                                        <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/50 uppercase tracking-[0.2em]">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* Marquee */}
            <div className="mt-32 border-t border-b border-white/10 py-6 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap flex">
                    {[...marqueeItems, ...marqueeItems].map((item, i) => (
                        <span
                            key={i}
                            className="font-[family-name:var(--font-jetbrains)] text-sm md:text-base text-white/20 mx-8 tracking-[0.2em]"
                        >
                            {item} •
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
