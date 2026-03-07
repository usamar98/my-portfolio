"use client";

import React from "react";
import { motion } from "framer-motion";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

interface Service {
    number: string;
    title: string;
    description: string;
    tags: string[];
    price: string;
}

const services: Service[] = [
    {
        number: "01",
        title: "Web Development",
        description:
            "Custom-built web applications with modern frameworks. From landing pages to full SaaS platforms.",
        tags: ["Next.js", "React", "Custom Builds"],
        price: "Starting $300",
    },
    {
        number: "02",
        title: "Booking Automation",
        description:
            "End-to-end booking systems that convert visitors into booked appointments. Full CRM integration.",
        tags: ["GHL", "Calendly", "CRM Setup"],
        price: "Starting $400",
    },
    {
        number: "03",
        title: "AI Automation",
        description:
            "Intelligent chatbots, automated workflows, and API integrations that save hours of manual work.",
        tags: ["Chatbots", "Workflows", "API Integration"],
        price: "Starting $500",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <RevealOnScroll>
                    <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 uppercase tracking-[0.3em] mb-4">
                        What I Do
                    </p>
                    <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white mb-20">
                        SERVICES
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <RevealOnScroll key={service.number} delay={i * 0.15}>
                            <motion.div
                                className="border-2 border-white/20 p-8 md:p-10 h-full flex flex-col justify-between hoverable group relative overflow-hidden"
                                whileHover="hovered"
                                initial="default"
                            >
                                {/* Background fill on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-white z-0"
                                    variants={{
                                        default: { scaleY: 0 },
                                        hovered: { scaleY: 1 },
                                    }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                                    style={{ originY: 1 }}
                                />

                                <div className="relative z-10">
                                    <span className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 group-hover:text-black/30 tracking-[0.3em] transition-colors duration-500">
                                        {service.number}
                                    </span>
                                    <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white group-hover:text-black mt-4 transition-colors duration-500">
                                        {service.title}
                                    </h3>
                                    <p className="font-[family-name:var(--font-jetbrains)] text-[12px] text-white/40 group-hover:text-black/50 mt-4 leading-relaxed transition-colors duration-500">
                                        {service.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {service.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="font-[family-name:var(--font-jetbrains)] text-[9px] text-white/30 group-hover:text-black/40 border border-white/10 group-hover:border-black/20 px-3 py-1 uppercase tracking-[0.15em] transition-colors duration-500"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative z-10 mt-8 pt-6 border-t border-white/10 group-hover:border-black/10 transition-colors duration-500">
                                    <span className="font-[family-name:var(--font-jetbrains)] text-lg text-white group-hover:text-black font-medium transition-colors duration-500">
                                        {service.price}
                                    </span>
                                </div>
                            </motion.div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
