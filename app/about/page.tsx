'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';
import CountUp from 'react-countup';

const About3D = () => {
  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh>
          <torusGeometry args={[1.2, 0.4, 16, 100]} />
          <meshStandardMaterial
            color="#1e3a5f"
            metalness={0.9}
            roughness={0.1}
            emissive="#3b82f6"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
};

const AboutPage = () => {
  const achievements = [
    { icon: "⚙️", number: 30, label: "Years of Excellence", suffix: "+" },
    { icon: "🚀", number: 500, label: "Projects Delivered", suffix: "+" },
    { icon: "👨‍💻", number: 100, label: "Expert Engineers", suffix: "+" },
    { icon: "✨", number: 99.8, label: "Precision Accuracy", suffix: "%" }
  ];

  const philosophy = [
    { title: "Precision", desc: "Micron-level engineering standards for ultimate accuracy" },
    { title: "Scalability", desc: "Systems built from the ground up for enterprise growth" },
    { title: "Reliability", desc: "Proven 99.8% uptime performance in industrial environments" }
  ];

  return (
    <div className="min-h-screen pt-24">
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-gray-900 leading-tight">
                About <span className="text-blue-600">Us</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                We're engineering the future of industrial automation with precision, innovation, and excellence at our core
              </p>
            </motion.div>
            <div className="h-[400px]">
              <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
                <OrbitControls enableZoom={true} enablePan={false} />
                <color attach="background" args={['#ffffff']} />
                <Environment preset="city" />
                <About3D />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#050814]">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text"
          >
            Our Journey
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-8 text-center"
              >
                <div className="text-5xl mb-4">{achievement.icon}</div>
                <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-3">
                  <CountUp
                    start={0}
                    end={achievement.number}
                    duration={2}
                    decimals={achievement.number === 99.8 ? 1 : 0}
                    suffix={achievement.suffix}
                  />
                </div>
                <div className="text-gray-400">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 glow-text"
          >
            Our Philosophy
          </motion.h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            {philosophy.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card p-8"
              >
                <h3 className="text-2xl font-bold mb-3 text-blue-400">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
