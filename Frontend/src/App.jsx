import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/HeroSection";
import FeaturedPosts from "./components/BlogCard";
import About from "./components/about";
import Categories from "./components/CategoryTab";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import OtpVerifyPage from "./pages/otpVerfiyeng";
import BlogPostForm from "./components/BlogPostForm";
import FeaturedPostsPage from "./pages/FeaturedPosts";
import { LoginPage, RegisterPage } from "./pages/Authpage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/ProfilePage";
import BlogDetail from "./components/BlogDetail";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);

  useEffect(() => {
    gsap.set("body", { overflow: "hidden" });

    const tl = gsap.timeline();
    tl.to("body", { overflow: "auto", duration: 0.1, delay: 0.5 });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={appRef} className="min-h-screen bg-white">
      <Header />
      <Routes>
        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-otp" element={<OtpVerifyPage />} />

        {/* Public Landing */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedPosts />
              <About />
              <Categories />
              <Newsletter />
              <Footer />
            </>
          }
        />
        <Route path="/about" element={<About />} />

        {/* Other Pages */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-post" element={<BlogPostForm />} />
        <Route path="/recipes" element={<FeaturedPostsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-blog" element={<BlogPostForm />} />

        {/* Blog Details Page */}
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

export default App;
