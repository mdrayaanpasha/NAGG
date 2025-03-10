"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const testimonials = [
  { name: "John Doe", title: "Tech Enthusiast", quote: "NAGG has completely changed how I consume news. It's fast, efficient, and tailored to my needs." },
  // ... keep the same testimonials array
];

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-xl font-semibold">NAGG</span>
          <Button variant="outline" className="rounded-full hover:cursor-pointer" onClick={e=>window.location.href="./news"}>Latest News</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            className="text-5xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            News, Curated<br />For Your Curiosity
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Concise summaries from trusted sources. No clutter, just clarity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button className="hover:cursor-pointer rounded-full px-8 py-6 text-lg bg-gray-900 hover:bg-gray-800 hover:shadow-lg transition-all hover:cursor-pointer" onClick={e=>window.location.href="./register"}>
              Start Free Trial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-16">Why NAGG Stands Out</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Brevity", text: "Get key insights in 15-second summaries" },
              { title: "Personalization", text: "AI-curated feed based on your interests" },
              { title: "Clarity", text: "Clean interface with zero distractions" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">Trusted by Thinkers</h2>
          <div className="flex overflow-x-auto pb-8 scrollbar-hide space-x-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="min-w-[320px] max-w-[320px] p-6 bg-white rounded-xl border border-gray-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-gray-600 mb-4">“{testimonial.quote}”</p>
                <div className="font-medium">
                  <div>{testimonial.name}</div>
                  <div className="text-gray-500 text-sm">{testimonial.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">Transform Your News Experience</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of informed readers who start their day smarter
          </p>
          <Button className="hover:cursor-pointer rounded-full px-8 py-6 text-lg bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg" onClick={(e)=>window.location.href="./register"}>
            Get Early Access
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p className="mb-4">NAGG: Thoughtful news for the curious mind</p>
          <p className="text-sm">© 2024 NAGG.</p>
        </div>
      </footer>
    </div>
  );
}