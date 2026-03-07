"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

interface Project {
    name: string;
    tagline: string;
    tags: string[];
    description: string;
    url: string;
    image: string;
}

const projects: Project[] = [
    {
        name: "Hirevate.com",
        tagline: "AI Resume Builder SaaS",
        tags: ["Next.js", "AI", "SaaS"],
        description:
            "AI-powered resume builder that helps job seekers craft compelling resumes with intelligent suggestions and ATS optimization.",
        url: "https://hirevate.com/",
        image: "/projects/hirevate.png",
    },
    {
        name: "EditingApp.live",
        tagline: "All-in-One Creative Studio",
        tags: ["React", "AI", "Video"],
        description:
            "Automated video editing platform leveraging AI to transform raw footage into polished, professional content at scale.",
        url: "https://editingapp.live/",
        image: "/projects/editingapp.png",
    },
    {
        name: "AionAI.live",
        tagline: "Web3 Security & Privacy Stack",
        tags: ["Node.js", "AI", "Web3"],
        description:
            "End-to-end AI automation platform that connects APIs, processes data, and automates complex business workflows.",
        url: "https://aionai.live/",
        image: "/projects/aionai.png",
    },
    {
        name: "Podiatrists-AU",
        tagline: "Healthcare Booking Demo",
        tags: ["Next.js", "GHL", "Booking"],
        description:
            "Full-featured healthcare booking system with GHL integration, patient management, and automated appointment flows.",
        url: "https://podiatrists-au.vercel.app/",
        image: "/projects/podiatrists.png",
    },
    {
        name: "Dental Clinic Demo",
        tagline: "Full Service Demo Site",
        tags: ["React", "GHL", "Animation"],
        description:
            "Premium dental clinic website with interactive booking, service exploration, and patient engagement features.",
        url: "https://dentists-app.vercel.app/",
        image: "/projects/dentists.png",
    },
    {
        name: "GHL Automation",
        tagline: "CRM & Booking Automation",
        tags: ["GHL", "Zapier", "AI"],
        description:
            "Complete CRM automation system with multi-channel communication, lead management, and smart booking workflows.",
        url: "#",
        image: "/projects/ghl-automation.png",
    },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block flex-shrink-0"
        >
            <motion.div
                className="flex-shrink-0 w-[85vw] md:w-[500px] h-[75vh] md:h-[80vh] border border-white/20 bg-black relative group hoverable overflow-hidden snap-center"
                whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 40px rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.4 }}
            >
                {/* Browser Mockup — Top 60% */}
                <div className="h-[60%] border-b border-white/10 p-4 flex flex-col">
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="browser-dots" />
                        <div className="flex-1 mx-4 h-5 bg-white/5 rounded-full flex items-center px-3">
                            <span className="font-[family-name:var(--font-jetbrains)] text-[8px] text-white/20 truncate">
                                {project.url !== "#" ? project.url : ""}
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 border border-white/10 relative overflow-hidden">
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={project.name}
                                fill
                                className="object-cover object-top"
                                sizes="(max-width: 768px) 85vw, 500px"
                            />
                        ) : (
                            /* Abstract mockup fallback */
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
                                <div className="w-full h-3 bg-white/5 rounded" />
                                <div className="w-3/4 h-3 bg-white/5 rounded" />
                                <div className="w-full h-20 bg-white/[0.03] rounded mt-4" />
                                <div className="flex gap-2 mt-2 w-full">
                                    <div className="flex-1 h-16 bg-white/[0.03] rounded" />
                                    <div className="flex-1 h-16 bg-white/[0.03] rounded" />
                                </div>
                                <div className="w-1/2 h-3 bg-white/5 rounded mt-4" />
                            </div>
                        )}
                        <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-playfair)] text-6xl md:text-8xl font-bold text-white/[0.03] select-none pointer-events-none">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* Info — Bottom 40% */}
                <div className="h-[40%] p-6 md:p-8 flex flex-col justify-between relative">
                    <div>
                        <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white">
                            {project.name}
                        </h3>
                        <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/40 mt-1 tracking-wider">
                            {project.tagline}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/30 border border-white/10 px-3 py-1 uppercase tracking-[0.15em]"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-between mt-4">
                        <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/20 uppercase tracking-widest">
                            View Project
                        </span>
                        <span className="text-white/40 text-xl group-hover:translate-x-2 transition-transform duration-300">
                            →
                        </span>
                    </div>

                    {/* Hover Description Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/95 p-6 md:p-8 flex items-center"
                        initial={{ y: "100%" }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <p className="font-[family-name:var(--font-jetbrains)] text-sm text-white/60 leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </a>
    );
}

export default function Projects() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true });

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = direction === "left" ? -520 : 520;
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section id="work" ref={sectionRef} className="py-32">
            {/* Section Header */}
            <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
                <RevealOnScroll>
                    <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 uppercase tracking-[0.3em] mb-4">
                        Portfolio
                    </p>
                    <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-bold text-white">
                        SELECTED
                        <br />
                        WORK
                    </h2>
                </RevealOnScroll>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-6 px-6 md:px-12 overflow-x-scroll hide-scrollbar snap-x snap-mandatory pb-8"
                >
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, x: 80 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                        >
                            <ProjectCard project={project} index={i} />
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <div className="flex gap-4 px-6 md:px-12 mt-8">
                    <button
                        onClick={() => scroll("left")}
                        className="w-12 h-12 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/60 transition-all duration-300 hoverable"
                        aria-label="Scroll left"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-12 h-12 border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/60 transition-all duration-300 hoverable"
                        aria-label="Scroll right"
                    >
                        →
                    </button>
                </div>
            </div>
        </section>
    );
}
