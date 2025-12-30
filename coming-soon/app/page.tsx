"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';

// --- Types & Interfaces ---
interface MetaProps {
  title: string;
  description: string;
}

// --- Components ---

/**
 * Minimalist Loader Component
 * Accessible with role="status" for screen readers
 */
const Loader: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      exit={{ transition: { duration: 0.8, ease: "easeInOut" } }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          className="h-12 w-12 border-2 border-neutral-100 rounded-full"
        />
        {/* Animated Inner Ring */}
        <motion.div
          className="absolute h-12 w-12 border-t-2 border-neutral-900 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

/**
 * Main Landing Page Component
 */
const LandingPage: React.FC = () => {
  // SEO: Update document title and meta description dynamically
  // Note: In Next.js, use the Metadata API. In standard React, this works effectively.
  useEffect(() => {
    document.title = "Timothé Fardella | First Blockchain Portfolio Coming Soon";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "My new blockchain portfolio website is currently under construction. Coming soon.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "My new blockchain portfolio website is currently under construction. Coming soon.";
      document.head.appendChild(meta);
    }
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9], // Custom Bezier for premium feel
      },
    },
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 py-12 text-center sm:px-12">
      <motion.div
        className="max-w-md space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Indicator */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-widest text-neutral-600">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Under Construction
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-sans text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
        >
          Something bold is coming.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-sm text-lg leading-relaxed text-neutral-500"
        >
          My new blockchain portfolio website is currently being crafted with care. Check back soon for updates.
        </motion.p>

        {/* Action Area */}
        <motion.div variants={itemVariants} className="pt-4">
          <a
            href="https://github.com/teamssUTXO"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-all hover:border-neutral-900 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            aria-label="Visit my GitHub profile"
          >
            <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span>Follow on GitHub</span>
            <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </a>
        </motion.div>
      </motion.div>

      {/* Footer / Copyright */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 text-xs text-neutral-400"
      >
        &copy; {new Date().getFullYear()} Timothé Fardella. All rights reserved.
      </motion.footer>
    </main>
  );
};

/**
 * Root Application Component
 * Manages the loading state logic
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading or minimum display time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? <Loader key="loader" /> : <LandingPage key="landing" />}
      </AnimatePresence>
    </div>
  );
}