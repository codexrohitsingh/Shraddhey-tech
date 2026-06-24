'use client';

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  Float,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const previewImages = [
  "20160303_185155-removebg-preview.png",
  "DSC00482-removebg-preview.png",
  "DSC00489-removebg-preview.png",
  "DSC00491-removebg-preview.png",
  "DSC07321-removebg-preview.png",
  "IMG_20161026_162025_HDR-removebg-preview.png",
  "IMG_20170117_165033-removebg-preview.png",
  "IMG_20180329_040020-removebg-preview.png",
  "IMG_20180724_172228-removebg-preview.png",
  "IMG_20180724_175356-removebg-preview.png",
  "IMG_20230729_171100-removebg-preview.png",
  "IMG_20230803_180455-removebg-preview.png",
];

const Hero3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6;
      meshRef.current.rotation.y += delta * 0.9;

      // Mouse parallax
      meshRef.current.rotation.x += mousePos.y * 0.1;
      meshRef.current.rotation.y += mousePos.x * 0.1;

      // Breathing scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#60a5fa" />
      <pointLight position={[-10, 5, 10]} intensity={1.5} color="#2563eb" />
      <pointLight position={[0, -10, 5]} intensity={1} color="#60a5fa" />

      {/* Glow effect */}
      <mesh>
        <torusKnotGeometry args={[2.2, 0.5, 200, 32]} />
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <torusKnotGeometry args={[1.8, 0.4, 200, 32]} />
          <meshStandardMaterial
            color="#2563eb"
            metalness={1}
            roughness={0.02}
            emissive="#1e3a5f"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Sparkles
        count={150}
        scale={12}
        size={3}
        speed={0.8}
        opacity={0.6}
        color="#60a5fa"
      />
    </group>
  );
};

const HeroSection = () => {
  return (
    <section className="section relative pt-24 bg-white" id="hero">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 mt-2 text-gray-900 leading-tight">
              Precision Engineering
              <br />
              <div className="text-blue-600">
                for the Future of Manufacturing
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Industrial automation systems engineered for scale, efficiency,
              precision, and reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
              >
                Explore Solutions
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-all"
              >
                Book Consultation
              </motion.button>
            </div>
          </motion.div>
          <div className="h-[500px]">
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.8}
              />
              <color attach="background" args={["#ffffff"]} />
              <Environment preset="city" />
              <Stars
                radius={100}
                depth={50}
                count={8000}
                factor={4}
                saturation={0}
                fade
                speed={1.5}
              />
              <Hero3D />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

const Engineering3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.z += delta * 0.2;

      // Mouse parallax
      meshRef.current.rotation.x += mousePos.y * 0.05;
      meshRef.current.rotation.y += mousePos.x * 0.05;

      // Breathing scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.05;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#60a5fa" />
      <pointLight position={[-5, 2, 5]} intensity={1.5} color="#2563eb" />
      <pointLight position={[0, -5, 5]} intensity={1} color="#60a5fa" />

      {/* Glow effect */}
      <mesh>
        <boxGeometry args={[2.4, 2.4, 2.4]} />
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef} castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#2563eb"
            metalness={1}
            roughness={0.03}
            emissive="#1e3a5f"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      <Sparkles
        count={100}
        scale={10}
        size={2.5}
        speed={0.6}
        opacity={0.5}
        color="#60a5fa"
      />
    </group>
  );
};

const PhilosophyCard = ({
  title,
  description,
  delay,
}: {
  title: string;
  description: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="glass-card p-8"
    >
      <h3 className="text-2xl font-bold mb-3 text-blue-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const EngineeringPhilosophy = () => {
  return (
    <section
      className="section"
      id="about"
      style={{ backgroundColor: "#0A1020" }}
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card h-96 md:h-[600px] overflow-hidden"
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
              <OrbitControls enableZoom={true} enablePan={false} />
              <color attach="background" args={["#0A1020"]} />
              <Environment preset="city" />
              <Engineering3D />
            </Canvas>
          </motion.div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 glow-text">
              Engineering Philosophy
            </h2>
            <PhilosophyCard
              title="Precision"
              description="Micron-level engineering standards for ultimate accuracy."
              delay={0}
            />
            <PhilosophyCard
              title="Scalability"
              description="Systems built from the ground up for enterprise growth."
              delay={0.15}
            />
            <PhilosophyCard
              title="Reliability"
              description="Proven 99.8% uptime performance in industrial environments."
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionsSection = () => {
  const solutions = [
    "Automated Gauging Systems",
    "Precision Measurement Machines",
    "Robotic Inspection Cells",
    "Smart Manufacturing Analytics",
    "AI-based SPC Systems",
    "Custom Automation Lines",
  ];

  return (
    <section className="section" id="solutions">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text"
        >
          Our Solutions
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass-card p-8"
            >
              <h3 className="text-xl font-semibold mb-3 text-white">
                {solution}
              </h3>
              <p className="text-gray-400 text-sm">
                High-performance industrial automation solution
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = () => {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text"
        >
          Our Projects
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {previewImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card overflow-hidden"
            >
              <img
                src={`/${image}`}
                alt={`Project ${index + 1}`}
                className="w-full h-48 object-contain p-4"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementCard = ({
  icon,
  number,
  label,
  suffix,
  delay,
}: {
  icon: string;
  number: number;
  label: string;
  suffix?: string;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-card p-8 text-center"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-3">
        {isInView && (
          <CountUp
            start={0}
            end={number}
            duration={2}
            decimals={number === 99.8 ? 1 : 0}
            suffix={suffix || ""}
          />
        )}
      </div>
      <div className="text-gray-400">{label}</div>
    </motion.div>
  );
};

const AchievementsSection = () => {
  return (
    <section className="section" id="services">
      <div className="max-w-5xl mx-auto px-6 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text"
        >
          Our Achievements
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AchievementCard
            icon="⚙️"
            number={30}
            label="Years Engineering Excellence"
            suffix="+"
            delay={0}
          />
          <AchievementCard
            icon="🚀"
            number={500}
            label="Projects Delivered"
            suffix="+"
            delay={0.15}
          />
          <AchievementCard
            icon="👨‍💻"
            number={100}
            label="Engineers"
            suffix="+"
            delay={0.3}
          />
          <AchievementCard
            icon="✨"
            number={99.8}
            label="Precision Accuracy"
            suffix="%"
            delay={0.45}
          />
        </div>
      </div>
    </section>
  );
};

const IndustriesSection = () => {
  const industries = [
    "Automotive",
    "Aerospace",
    "Defense",
    "Medical Manufacturing",
    "Heavy Engineering",
    "Precision Components",
  ];

  return (
    <section className="section" id="industries">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text"
        >
          Industries We Serve
        </motion.h2>

        <div className="flex overflow-x-auto gap-6 pb-4">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="min-w-[200px] glass-card p-6 flex items-center justify-center"
            >
              <span className="text-lg font-semibold text-center">
                {industry}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section className="section" id="contact">
      <div className="max-w-2xl mx-auto px-6 w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-8 glow-text"
        >
          Let's Build the Future
        </motion.h2>
        <p className="text-gray-400 mb-10 text-lg">
          Get in touch with our engineering team
        </p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-lg font-semibold transition-all"
            >
              Send Message
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <EngineeringPhilosophy />
      <SolutionsSection />
      <ProjectsSection />
      <AchievementsSection />
      <IndustriesSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
