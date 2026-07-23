import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

import coverageBg from '../../Assets/Testimony.png';
import kreetiImage from '../../Assets/Kreeti.png';
import naveenImage from '../../Assets/Naveen.png';
import sarahImage from '../../Assets/Sarah.png';
import davidImage from '../../Assets/David.png';
import priyaImage from '../../Assets/Priya.png';
import padmaImage from '../../Assets/Padma.png';

const testimonials = [
  {
    name: 'David Brunton',
    role: 'Data Analyst Aspirant',
    initials: 'AM',
    quote: 'CareerSense helped me improve my ATS score from 54% to 86%. I started getting calls from top companies.',
    image: davidImage,
  },
  {
    name: 'Priya Sharma',
    role: 'Final Year Engineering Student',
    initials: 'PS',
    quote: 'The interview simulator feels so real. It boosted my confidence and helped me crack my placement.',
    image: priyaImage,
  },
  {
    name: 'Rahul Verma',
    role: 'Working Professional',
    initials: 'RV',
    quote: 'CareerSense helped me switch to a better role in a data-driven company with a stronger profile.',
    image: naveenImage,
  },
  {
    name: 'Susana Mcmallen',
    role: 'Data Science Learner',
    initials: 'AG',
    quote: 'The certifications added credibility to my profile and helped me impress recruiters.',
    image: sarahImage,
  },
  {
    name: 'Kreeti Malhotra',
    role: 'Product Manager Expert',
    initials: 'VM',
    quote: 'The AI Resume Builder completely transformed how I present my metrics. The bullet suggestions are brilliant and saved me hours of formatting.',
    image: kreetiImage,
  },
  {
    name: 'Sneha Reddy',
    role: 'Software Engineer Fresher',
    initials: 'SR',
    quote: 'Tracking my Career Readiness Score gave me a clear roadmap of exactly what to fix. It took the guesswork completely out of my job hunt.',
    image: padmaImage,
  },
];

const ITEMS_PER_PAGE = 3;

export default function TestimonialsSection({ heroTheme = 'dark' }) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const isLightTheme = heroTheme === 'light';

  const numPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const currentPage = Math.floor(testimonialIndex / ITEMS_PER_PAGE);

  const visibleTestimonials = useMemo(
    () => testimonials.slice(testimonialIndex, testimonialIndex + ITEMS_PER_PAGE),
    [testimonialIndex]
  );

  const handleNextPage = () => {
    setTestimonialIndex((prev) => 
      prev + ITEMS_PER_PAGE >= testimonials.length ? 0 : prev + ITEMS_PER_PAGE
    );
  };

  const handlePrevPage = () => {
    setTestimonialIndex((prev) => 
      prev === 0 ? testimonials.length - ITEMS_PER_PAGE : prev - ITEMS_PER_PAGE
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextPage();
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonialIndex]);

  return (
    <section
      id="testimonials"
      className={`relative overflow-hidden py-16 lg:py-20 ${
        isLightTheme ? 'bg-[#e9f3ff]' : 'bg-slate-950'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
            isLightTheme ? 'opacity-84' : 'opacity-90 mix-blend-luminosity'
          }`}
          style={{ backgroundImage: `url(${coverageBg})` }}
        />
        <div
          className={`absolute inset-0 ${
            isLightTheme
              ? 'bg-[linear-gradient(90deg,rgba(237,246,255,0.72)_0%,rgba(229,242,255,0.56)_36%,rgba(223,238,255,0.34)_68%,rgba(223,238,255,0.48)_100%)]'
              : 'bg-slate-950/80 mix-blend-multiply'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-8">
        
        {/* Edge-to-Edge Grid (Removed the white container padding) */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          
          {/* Left Header Panel - Original Typography but adjusted for dark background */}
          <div className="flex flex-col justify-between lg:col-span-4 h-full">
            <div>

              <h2
                className={`mt-5 text-[34px] font-bold leading-[1.1] tracking-tight ${
                  isLightTheme ? 'text-slate-950' : 'text-white'
                }`}
              >
            Success Stories{" "}
            <span
              className={
                isLightTheme
                  ? 'text-cyan-600'
                  : 'bg-gradient-to-r from-cyan-300 via-teal-300 to-blue-400 bg-clip-text text-transparent'
              }
            >
              That Build
            </span>{" "}
            Career Confidence
          </h2>

              <p
                className={`mt-4 max-w-[34ch] text-sm font-normal leading-relaxed ${
                  isLightTheme ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                Real stories from learners who used CareerSense to strengthen their profiles, improve readiness, and get closer to the right opportunities.
              </p>
            </div>
          </div>

          {/* Right Feed Panel */}
          <div className="flex flex-col lg:col-span-8">
            
            {/* Dynamic Grid Window */}
            <div className="min-h-[220px] sm:min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-4 sm:grid-cols-3"
                >
                  {visibleTestimonials.map((testimonial) => (
                    <article
                      key={testimonial.name}
                      className="group flex flex-col justify-between rounded-2xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-teal-500/50 hover:shadow-md hover:shadow-teal-500/10"
                    >
                      <div>
                        {/* Card User Header */}
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold truncate text-slate-900">{testimonial.name}</h4>
                            <span className="block truncate text-[11px] font-medium text-slate-400">{testimonial.role}</span>
                          </div>
                        </div>

                        {/* Card Text Context */}
                        <div className="relative mt-3">
                          <Quote className="absolute -left-1 -top-1 h-5 w-5 text-teal-500/5 rotate-180" />
                          <p className="relative z-10 text-[12.5px] leading-relaxed text-slate-600 pl-3">
                            {testimonial.quote}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Row */}
            <div
              className={`mt-6 flex items-center justify-between border-t pt-4 ${
                isLightTheme ? 'border-slate-900/10' : 'border-white/10'
              }`}
            >
              <div className="flex gap-1.5">
                <button
                  onClick={handlePrevPage}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-800"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNextPage}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-200 bg-teal-50 text-teal-600 shadow-sm transition hover:bg-teal-100"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Page Indicator Dot Trackers */}
              <div className="flex gap-1.5 px-1">
                {[...Array(numPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index * ITEMS_PER_PAGE)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentPage
                        ? 'w-4 bg-teal-400'
                        : isLightTheme
                          ? 'w-1.5 bg-slate-400/30 hover:bg-slate-500/40'
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
