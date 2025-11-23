import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EbookCard from '../ui/EbookCard';
import { ebooksData } from '../../data/ebooks';

gsap.registerPlugin(ScrollTrigger);

const Ebooks = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div id="ebooks" ref={sectionRef} className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 ref={titleRef} className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Essential Ebooks
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Deep dives into specific topics that you can take anywhere.
          </p>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {ebooksData.slice(0, 2).map((ebook) => (
            <EbookCard key={ebook.id} {...ebook} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ebooks;

