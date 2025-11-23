import React, { useRef, useEffect } from 'react';
import { Zap, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CourseCard = React.memo((props) => {
  const { title, level, lessons, duration, image, tag, videoUrl } = props;
  const cardRef = useRef(null);
  const contentRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    // Fade in animation on scroll
    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
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
      gsap.to(card, { y: -8, duration: 0.3, ease: 'power2.out' });
      gsap.to(content, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to(content, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={cardRef} className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="flex-shrink-0 relative group cursor-pointer" onClick={() => videoUrl && setIsModalOpen(true)}>
          <div className="h-48 w-full bg-gray-200 relative flex items-center justify-center overflow-hidden">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 text-blue-600 ml-1" />
            </div>
            <span className="absolute top-4 right-4 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 z-10">
              {tag}
            </span>
          </div>
        </div>
        <div ref={contentRef} className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-600">{level}</p>
            <div className="block mt-2">
              <p className="text-xl font-semibold text-gray-900">{title}</p>
              <p className="mt-3 text-base text-gray-500">
                Master the fundamentals and advanced techniques to apply AI in real-world scenarios.
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <Zap className="h-4 w-4 mr-1 text-yellow-500" />
              {lessons} Lessons • {duration}
            </div>
            {videoUrl && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Watch Preview
              </button>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <iframe
              src={`${getEmbedUrl(videoUrl)}?autoplay=1`}
              title={title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;

