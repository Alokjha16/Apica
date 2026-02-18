import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-[90px]">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Landing;
