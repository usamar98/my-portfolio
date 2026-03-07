"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import RevealOnScroll from "@/components/animations/RevealOnScroll";

const trustImages = [
    "/projects/my img.jpeg",
    "/projects/my img2.jpeg",
    "/projects/my img3.jpeg",
    "/projects/my img4.jpeg",
    "/projects/my img5.jpeg",
    "/projects/my img6.jpeg",
];

export default function TrustGallery() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section ref={sectionRef} className="py-24 border-t border-white/10">
            <div className="px-6 md:px-12 max-w-7xl mx-auto mb-16 text-center">
                <RevealOnScroll>
                    <p className="font-[family-name:var(--font-jetbrains)] text-[11px] text-white/30 uppercase tracking-[0.3em] mb-4">
                        Client Trust
                    </p>
                    <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white">
                        MOMENTS
                    </h2>
                </RevealOnScroll>
            </div>

            <div className="relative">
                {/* Scroll track */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 md:gap-6 px-6 md:px-12 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8"
                >
                    {trustImages.map((src, i) => (
                        <motion.div
                            key={src}
                            initial={{ opacity: 0, x: 40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className="flex-shrink-0 w-[70vw] md:w-[400px] h-[50vh] md:h-[500px] snap-center relative group overflow-hidden border border-white/10"
                        >
                            <Image
                                src={src}
                                alt={`Trust moment ${i + 1}`}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                sizes="(max-width: 768px) 70vw, 400px"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
