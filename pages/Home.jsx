import React from 'react';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import Courses from '../components/sections/Courses';
import Ebooks from '../components/sections/Ebooks';
import Mission from '../components/sections/Mission';
import CTA from '../components/sections/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Courses />
      <Ebooks />
      <Mission />
      <CTA />
    </>
  );
};

export default Home;

