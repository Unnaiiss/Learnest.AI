import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Cpu, ArrowRight, Play } from 'lucide-react';
import { gsap } from 'gsap';
import Button from '../ui/Button';
import Hero3D from '../3d/Hero3D';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

    gsap.to(cardRef.current, {
      y: -10,
      duration: 2,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden bg-white min-h-[90vh] flex items-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-purple-100/50 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-200" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-400" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left pt-10 lg:pt-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              New AI Courses Available
            </div>

            <h1 ref={titleRef} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              Democratizing <br />
              <span className="text-gradient">AI Education</span>
            </h1>

            <p ref={subtitleRef} className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Master artificial intelligence with our comprehensive curriculum. From basics to advanced implementation, we guide your journey into the future.
            </p>

            <div ref={buttonsRef} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/courses">
                <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/about">
                <button className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto">
                  <Play className="w-4 h-4 fill-current" />
                  Watch Demo
                </button>
              </Link>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Certified Content</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Expert Instructors</span>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="lg:col-span-6 mt-16 lg:mt-0 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-white/50 backdrop-blur-sm p-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Hero3D />
                </div>

                {/* Floating Card */}
                <div ref={cardRef} className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-white/50">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Cpu className="text-blue-600 h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Start Learning Today</p>
                      <p className="text-sm text-gray-600">Join 10,000+ students worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;

