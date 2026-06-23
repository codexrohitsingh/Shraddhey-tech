'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Sparkles, Stars, Float as DreiFloat } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#3b82f6" />
      
      <DreiFloat speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} emissive="#3b82f6" emissiveIntensity={0.3} />
        </mesh>
      </DreiFloat>
      
      <DreiFloat speed={1.5} rotationIntensity={0.3} floatIntensity={0.3} delay={0.2}>
        <mesh position={[3, 1, -2]}>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial color="#0f172a" metalness={1} roughness={0.05} />
        </mesh>
      </DreiFloat>
      
      <DreiFloat speed={2.5} rotationIntensity={0.7} floatIntensity={0.6} delay={0.4}>
        <mesh position={[-2.5, -1.5, 1]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.15} emissive="#60a5fa" emissiveIntensity={0.2} />
        </mesh>
      </DreiFloat>
    </group>
  );
};

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      '.hero-title',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
    )
    .fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      '.hero-cta',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.3'
    );
  }, []);

  return (
    <section className="section relative overflow-hidden" id="hero">
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <color attach="background" args={['#050505']} />
          <Environment preset="city" />
          <Hero3D />
        </Canvas>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.h1 
          className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 glow-text"
        >
          <span className="block">Precision Engineering</span>
          <span className="block text-blue-400">for the Future of Manufacturing</span>
        </motion.h1>
        
        <motion.p className="hero-subtitle text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
          Industrial automation solutions engineered for scale, precision, and reliability
        </motion.p>
        
        <motion.button 
          className="hero-cta bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 glow-border"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Explore Our Solutions
        </motion.button>
      </div>
    </section>
  );
};

const EngineeringPhilosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.fromTo(
      '.philosophy-text',
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } }
    );
  }, []);

  return (
    <section className="section bg-[#080808]" id="philosophy" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="h-96 md:h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden glow-border">
          <Canvas>
            <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
            <OrbitControls enableZoom={true} enablePan={false} />
            <color attach="background" args={['#0f172a']} />
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} castShadow />
            <DreiFloat speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
              <mesh>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.2} />
              </mesh>
            </DreiFloat>
            <mesh position={[2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 2, 32]} />
              <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.15} />
            </mesh>
            <mesh position={[-2, 0, 0]}>
              <sphereGeometry args={[0.5, 32, 32]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
            </mesh>
          </Canvas>
        </div>
        
        <div className="philosophy-text">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Engineering Philosophy</h2>
          <p className="text-xl text-gray-300 mb-4">Built with precision.</p>
          <p className="text-xl text-gray-300 mb-4">Engineered for scale.</p>
          <p className="text-xl text-gray-300">Designed for reliability.</p>
        </div>
      </div>
    </section>
  );
};

const SolutionsSection = () => {
  const solutions = [
    'Automated Gauging Systems',
    'Precision Measurement Machines',
    'Robotic Inspection Cells',
    'Smart Manufacturing Analytics',
    'AI-based SPC Systems',
    'Custom Automation Lines'
  ];

  return (
    <section className="section bg-[#050505]" id="solutions">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text">Our Solutions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-3 text-white">{solution}</h3>
              <p className="text-gray-400 text-sm">High-performance industrial automation solution</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementsSection = () => {
  const achievements = [
    { number: '30+', label: 'Years Engineering Excellence' },
    { number: '500+', label: 'Projects Delivered' },
    { number: '100+', label: 'Engineers' },
    { number: '99.8%', label: 'Precision Accuracy' }
  ];

  return (
    <section className="section bg-[#080808]" id="achievements">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text">Our Achievements</h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-2">{item.number}</div>
              <div className="text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndustriesSection = () => {
  const industries = [
    'Automotive',
    'Aerospace',
    'Defense',
    'Medical Manufacturing',
    'Heavy Engineering',
    'Precision Components'
  ];

  return (
    <section className="section bg-[#050505]" id="industries">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text">Industries We Serve</h2>
        
        <div className="flex overflow-x-auto gap-6 pb-4">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              className="min-w-[200px] bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center justify-center"
              whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
            >
              <span className="text-lg font-semibold text-center">{industry}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="section bg-[#080808]" id="contact">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 glow-text">Let's Build the Future</h2>
        <p className="text-gray-400 mb-10 text-lg">Get in touch with our engineering team</p>
        
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
            <motion.button
              className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-lg font-semibold transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-[#050505] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">© 2025 Shraddheytech. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  useEffect(() => {
    const lenis = new Lenis();
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <main>
      <HeroSection />
      <EngineeringPhilosophy />
      <SolutionsSection />
      <AchievementsSection />
      <IndustriesSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default HomePage;
