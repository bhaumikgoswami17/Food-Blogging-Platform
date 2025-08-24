import React from "react";
import Hero from "../components/HeroSection";
import Categories from "../components/CategoryTab";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import About from "../components/about";

const Dashboard = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      <About />
      <Newsletter/>
      {/* Categories Section */}
      <Categories />
      <Footer/>
    </div>
  );
};

export default Dashboard;
