import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CourseCard from '../components/ui/CourseCard';
import courseService from '../services/courses';

gsap.registerPlugin(ScrollTrigger);

const CoursesPage = () => {
  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
    <div ref={pageRef} className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100/50 blur-3xl rounded-full -z-10" />
          <h1 ref={titleRef} className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            Master AI with <span className="text-blue-600">Expert-Led Courses</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
            From machine learning fundamentals to advanced generative AI applications.
            Choose the path that fits your career goals.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;

