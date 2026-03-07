"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Chatbot from "@/components/Chatbot";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import TrustGallery from "@/components/TrustGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Services />
      <Booking />
      <Testimonials />
      <TrustGallery />
      <Footer />
      <Chatbot />
    </main>
  );
}
