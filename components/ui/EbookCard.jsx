import React, { useRef, useEffect } from 'react';
import { BookOpen, Download } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EbookCard = React.memo(({ title, description, color, pdfUrl }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Fade in animation on scroll
    gsap.fromTo(
      card,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(card, { scale: 1.05, rotateY: 5, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { scale: 1, rotateY: 0, duration: 0.3, ease: 'power2.out' });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div>
        <span className={`rounded-lg inline-flex p-3 ring-4 ring-white ${color} text-blue-600`}>
          <BookOpen className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-medium">
          <a href="#" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </a>
        </h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 text-gray-300 hover:text-blue-600 transition-colors"
        title="Download PDF"
      >
        <Download className="h-6 w-6" />
      </a>
    </div>
  );
});

EbookCard.displayName = 'EbookCard';

export default EbookCard;

