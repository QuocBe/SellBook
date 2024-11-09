import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import HeroSection from './Components/Home/HeroSection'; // Import HeroSection
import ExploreLibrary from './Components/Home/ExploreLibrary';
const Layout = () => {
  return (
    <div>
      <Header />
      <HeroSection /> {/* Phần Hero Section ở trên */}
      <ExploreLibrary /> {/* Thêm ExploreLibrary dưới HeroSection */}
      <main>
        <Outlet /> {/* This will render the nested routes */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
