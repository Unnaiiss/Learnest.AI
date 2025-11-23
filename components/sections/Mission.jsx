import React, { useRef, useEffect } from 'react';
import { CheckCircle, Users, Award, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  const features = [
    {
      title: 'Practical Focus',
      description: "We don't just teach theory. We show you how to use tools to get work done.",
      icon: Zap
    },
    {
      title: 'Community Driven',
      description: 'Join a Discord server of like-minded learners helping each other grow.',
      icon: Users
    },
    {
      title: 'Expert Instructors',
      description: 'Learn from industry professionals who are building AI systems today.',
      icon: Award
    },
    {
      title: 'Lifetime Access',
      description: 'Buy a course once, keep it forever. Get all future updates for free.',
      icon: CheckCircle
    }
  ];

  return (
    <div id="mission" ref={sectionRef} className="bg-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-blue-600 uppercase tracking-wide">Our Impact</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Learnest?
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We believe that understanding AI is a fundamental skill for the 21st century. Our goal is to bridge the gap between complex technology and everyday application.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={feature.title} ref={(el) => (itemsRef.current[index] = el)} className="flex flex-col items-start">
                <div className="rounded-lg bg-blue-50 p-2 ring-1 ring-blue-100 mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {feature.title}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Mission;

