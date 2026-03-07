"use client";

import { useEffect, useRef } from "react";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Custom cursor
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const addHover = () => cursor.classList.add("hovering");
    const removeHover = () => cursor.classList.remove("hovering");

    window.addEventListener("mousemove", moveCursor);

    const hoverables = document.querySelectorAll(
      'a, button, [data-hover], input, textarea, .hoverable'
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // Re-observe hoverables on DOM changes
    const observer = new MutationObserver(() => {
      const newHoverables = document.querySelectorAll(
        'a, button, [data-hover], input, textarea, .hoverable'
      );
      newHoverables.forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Usama Riaz — Full Stack Developer & AI Automation Expert</title>
        <meta
          name="description"
          content="Portfolio of Usama Riaz — Full Stack Developer, AI Automation Expert, and Web3 builder. Building digital products that work."
        />
      </head>
      <body
        className={`${playfair.variable} ${jetbrains.variable} bg-black text-white overflow-x-hidden antialiased`}
      >
        <div ref={cursorRef} className="custom-cursor hidden md:block" />
        {children}
      </body>
    </html>
  );
}
