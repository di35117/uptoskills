import React, { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { ChevronDown } from "./Icons";

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      q: "Is Thrill suitable for global hackathons?",
      a: "Absolutely. Our infrastructure is built to scale for thousands of concurrent participants with global proctoring and real-time support.",
    },
    {
      q: "How customizable is the event portal?",
      a: "Total customization. From colors and logos to custom URLs and form logic, Thrill is built to be an extension of your brand.",
    },
    {
      q: "Do participants get automated updates?",
      a: "Yes, our automated communication system keeps participants informed at every stage of the timeline.",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
          System FAQ
        </h2>
      </ScrollReveal>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0f] overflow-hidden hover:border-white/20 transition-colors">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <div
                  className={`transform transition-transform duration-300 ${openIndex === i ? "rotate-180 text-cyan-400" : "text-gray-500"}`}
                >
                  <ChevronDown />
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="px-6 pb-5 text-gray-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};
