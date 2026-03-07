"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right";
}

export default function RevealOnScroll({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const initialX = direction === "left" ? -60 : direction === "right" ? 60 : 0;
    const initialY = direction === "up" ? 60 : 0;

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, x: initialX, y: initialY }}
            animate={
                isInView
                    ? { opacity: 1, x: 0, y: 0 }
                    : { opacity: 0, x: initialX, y: initialY }
            }
            transition={{
                duration: 0.7,
                ease: "easeOut",
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
