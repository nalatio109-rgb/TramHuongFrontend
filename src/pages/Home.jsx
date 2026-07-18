import React from 'react';
import SmokeEffect from '../components/SmokeEffect';
import Hero from '../components/Hero';
import BrandValues from '../components/BrandValues';
import Categories from '../components/Categories';
import BestSellers from '../components/BestSellers';
import BrandStory from '../components/BrandStory';
import Blog from '../components/Blog';

function Home() {
  return (
    <>
      <div className="global-fixed-bg" style={{ backgroundImage: `url('/images/hero_bg.png')` }} />
      <div className="global-fixed-overlay" />
      <SmokeEffect />
      <main>
        <Hero />
        <BrandValues />
        <Categories isHome={true} />
        <BestSellers />
        <BrandStory />
        <Blog />
      </main>
    </>
  );
}

export default Home;
