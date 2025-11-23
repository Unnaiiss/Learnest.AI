import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { CheckCircle } from 'lucide-react';
import Mission from '../components/sections/Mission';

const About = () => {
  const pageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About Learnest
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Empowering the world through artificial intelligence education.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We believe that understanding AI is a fundamental skill for the 21st century. Our goal is to bridge the gap between complex technology and everyday application.
            </p>
            <p className="text-gray-600">
              Learnest.ai was founded with a simple vision: to make artificial intelligence education accessible to everyone, regardless of their background or technical expertise.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Courses</h3>
                  <p className="text-gray-600">From beginner to advanced, our courses cover all aspects of AI and machine learning.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Instructors</h3>
                  <p className="text-gray-600">Learn from industry professionals who are building AI systems today.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Practical Focus</h3>
                  <p className="text-gray-600">We don't just teach theory. We show you how to use tools to get work done.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Mission />
      </div>
    </div>
  );
};

export default About;
