"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

interface Testimonial {
    name: string;
    title: string;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Mitchell",
        title: "CEO, BrightPath Marketing",
        quote:
            "Usama completely transformed our business with a custom CRM and automation setup. Our booking rate doubled in the first month. His understanding of GHL and AI is unmatched.",
    },
    {
        name: "David Chen",
        title: "Founder, NexaFlow Studios",
        quote:
            "Working with Usama was a game-changer. He built us a full SaaS platform from scratch — beautiful UI, rock-solid backend, and delivered ahead of schedule. Absolute professional.",
    },
    {
        name: "Amira Hassan",
        title: "Director, HealthFirst Clinics",
        quote:
            "Our patient booking system went from chaotic to seamless. Usama's automation expertise saved us 20+ hours per week. He doesn't just build — he solves real problems.",
    },
    {
        name: "James Wilson",
        title: "CTO, TechInnovate",
        quote:
            "The web application Usama developed exceeded our expectations. The implementation of modern frameworks resulted in lightning-fast load times. Highly recommended.",
    },
    {
        name: "Elena Rodriguez",
        title: "Founder, Style & Grace",
        quote:
            "Usama's attention to detail is incredible. He captured our brand perfectly and built a site that not only looks stunning but converts visitors into customers effortlessly.",
    },
    {
        name: "Michael Park",
        title: "Director of Operations, Skyline Logistics",
        quote:
            "Automating our workflow seemed impossible until we met Usama. His tailored solutions saved us countless manual hours. A true expert in his field.",
    },
];

function TestimonialCard({
    testimonial,
    index,
}: {
    testimonial: Testimonial;
    index: number;
}) {
    return (
        <motion.div
            className="border border-white/10 p-8 md:p-10 relative group hoverable overflow-hidden flex flex-col h-full"
            whileHover={{
                borderColor: "rgba(255,255,255,0.3)",
                y: -4,
            }}
            transition={{ duration: 0.4 }}
        >
            {/* Large quote mark */}
            <span className="absolute top-6 right-8 font-[family-name:var(--font-playfair)] text-[120px] leading-none text-white/[0.03] select-none pointer-events-none">
                &ldquo;
            </span>

            {/* Number */}
            <span className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/20 tracking-[0.3em] uppercase">
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* Quote */}
            <p className="font-[family-name:var(--font-playfair)] text-lg md:text-xl text-white/80 leading-relaxed mt-6 mb-10 relative z-10 flex-1">
                &ldquo;{testimonial.quote}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-auto pt-6 border-t border-white/10">
                <p className="font-[family-name:var(--font-playfair)] text-base font-semibold text-white">
                    {testimonial.name}
                </p>
                <p className="font-[family-name:var(--font-jetbrains)] text-[10px] text-white/30 uppercase tracking-[0.15em] mt-1">
                    {testimonial.title}
                </p>
            </div>
        </motion.div>
    );
}

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section id="testimonials" ref={sectionRef} className="py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
                        <div>
                            <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 uppercase tracking-[0.3em] mb-4">
                                Testimonials
                            </p>
                            <h2 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold text-white">
                                WHAT THEY
                                <br />
                                <span className="text-white/40">SAY.</span>
                            </h2>
                        </div>
                        <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 max-w-xs leading-relaxed tracking-wide">
                            Real feedback from clients who trusted me with
                            their vision. Results speak louder than words.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 60 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: i * 0.15,
                                duration: 0.7,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                        >
                            <TestimonialCard
                                testimonial={testimonial}
                                index={i}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
