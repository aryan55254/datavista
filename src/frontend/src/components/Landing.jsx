import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaLink, FaImage, FaVideo, FaArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const ctaSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCTA = () => {
    ctaSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simple particles without multi-value animations
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden text-gray-900">
      {/* Animated background particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-500 opacity-10"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: 30,
              y: -30
            }}
            initial={{
              x: 0,
              y: 0
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Animated gradient background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.1), transparent 30%), radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1), transparent 30%)",
          }}
        />

        {/* Logo animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 1 }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-14 h-14 rounded-full border-t-4 border-l-4 border-white"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
        >
          ScrapeSift
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 text-xl text-gray-600 mt-6 max-w-2xl font-light"
        >
          Extract links, images, and videos from any public website effortlessly.
        </motion.p>

        <motion.button
          onClick={scrollToCTA}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-10 mt-10 px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full shadow-lg hover:shadow-xl cursor-pointer"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span>
            Get Started
          </motion.span>
        </motion.button>

        {/* Floating elements - simplified animations */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div
            className="absolute w-16 h-16 rounded-lg opacity-20 bg-blue-400"
            style={{ top: '30%', left: '20%' }}
            animate={{ y: -20 }}
            initial={{ y: 0 }}
            transition={{ duration: 7.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-10 h-10 rounded-full opacity-20 bg-blue-500"
            style={{ top: '60%', right: '20%' }}
            animate={{ y: 30 }}
            initial={{ y: 0 }}
            transition={{ duration: 9, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-20 h-8 rounded-full opacity-20 bg-blue-300"
            style={{ bottom: '20%', left: '35%' }}
            animate={{ y: -15 }}
            initial={{ y: 0 }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </div>

        {/* Downward pointing tick */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatType: "reverse"
          }}
          className="absolute bottom-10 z-10"
        >
          <motion.div
            animate={{ y: 10 }}
            initial={{ y: 0 }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut" 
            }}
          >
            <FaArrowDown className="text-blue-600 text-2xl" />
          </motion.div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6 text-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: scrollY > 100 ? 1 : 0, y: scrollY > 100 ? 0 : 40 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            Why Use ScrapeSift?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<FaLink />} 
              title="Extract Links" 
              description="Get all website links in seconds with powerful filtering options and instant results." 
              delay={0.1}
            />
            <FeatureCard 
              icon={<FaImage />} 
              title="Scrape Images" 
              description="Gather high-quality images for research, inspiration, or content creation with ease." 
              delay={0.3}
            />
            <FeatureCard 
              icon={<FaVideo />} 
              title="Fetch Videos" 
              description="Find video content quickly and efficiently with our intelligent recognition system." 
              delay={0.5}
            />
          </div>
        </motion.div>
      </section>
      
      {/* CTA Section */}
      <section ref={ctaSectionRef} className="relative py-24 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center overflow-hidden">
        {/* Simplified animated shapes in background */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <motion.div
            className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white"
            animate={{ scale: 1.2 }}
            initial={{ scale: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white"
            animate={{ scale: 1 }}
            initial={{ scale: 1.2 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollY > 600 ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h2 className="text-4xl font-bold">
            Ready to Transform Your Web Scraping?
          </h2>
          <p className="text-xl mt-6 text-blue-100">
            Join thousands of professionals using ScrapeSift to extract web data quickly and efficiently.
          </p>
          <motion.button
            onClick={() => navigate("/auth")}
            className="mt-10 px-8 py-4 bg-white text-blue-700 text-lg font-medium rounded-full shadow-lg hover:shadow-xl relative overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-30"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
            Start Scraping Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-xl transition-all relative overflow-hidden"
      whileHover={{ 
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      {/* Simplified background animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0"
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div 
        className="flex justify-center mb-4 text-blue-600 text-4xl relative z-10"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-semibold mb-3 relative z-10">{title}</h3>
      <p className="text-gray-600 relative z-10">{description}</p>
      
      {/* Animated corner accent */}
      <motion.div 
        className="absolute bottom-0 right-0 w-20 h-20 bg-blue-50 rounded-tl-full opacity-0"
        whileHover={{ opacity: 0.6, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default LandingPage;