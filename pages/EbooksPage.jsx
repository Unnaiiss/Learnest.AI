import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EbookCard from '../components/ui/EbookCard';
import { ebooksData } from '../data/ebooks';

gsap.registerPlugin(ScrollTrigger);

const EbooksPage = () => {
  const pageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const page = pageRef.current;
    const title = titleRef.current;
    if (!page || !title) return;

    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-100/50 blur-3xl rounded-full -z-10" />
          <h1 ref={titleRef} className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            Essential <span className="text-purple-600">AI Resources</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            Curated guides, cheat sheets, and deep dives to accelerate your learning.
            Download and keep them forever.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ebooksData.map((ebook) => (
            <EbookCard key={ebook.id} {...ebook} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EbooksPage;

