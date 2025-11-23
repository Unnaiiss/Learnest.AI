import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollTriggers = [];

    statsRef.current.forEach((stat, index) => {
      if (!stat) return;

      const statAnimation = gsap.fromTo(
        stat,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
      scrollTriggers.push(statAnimation.scrollTrigger);

      const target = stat.querySelector('dd');
      if (target) {
        const originalText = target.textContent;
        const number = parseInt(originalText.replace(/\D/g, ''));
        if (!isNaN(number) && number > 0) {
          const obj = { value: 0 };
          const counterAnimation = gsap.to(obj, {
            value: number,
            duration: 2,
            ease: 'power2.out',
            delay: index * 0.2 + 0.3,
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              const current = Math.floor(obj.value);
              if (originalText.includes('k+')) {
                target.textContent = `${current}k+`;
              } else if (originalText.includes('+')) {
                target.textContent = `${current}+`;
              } else {
                target.textContent = current.toString();
              }
            },
          });
          scrollTriggers.push(counterAnimation.scrollTrigger);
        }
      }
    });

    return () => {
      scrollTriggers.forEach(trigger => {
        if (trigger) trigger.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Trusted by learners worldwide
          </h2>
          <p className="text-lg text-gray-400">
            Our mission is to make AI literacy accessible to all. Join a growing community of innovators.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { label: 'Students', value: '10k+' },
            { label: 'Countries', value: '50+' },
            { label: 'Resources', value: '100+' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => (statsRef.current[index] = el)}
              className="glass-dark p-8 rounded-2xl text-center transform hover:scale-105 transition-transform duration-300"
            >
              <dt className="order-2 mt-2 text-lg font-medium text-gray-400">{stat.label}</dt>
              <dd className="order-1 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;

