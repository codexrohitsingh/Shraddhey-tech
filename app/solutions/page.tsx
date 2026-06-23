'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float } from '@react-three/drei';

const previewImages = [
  '20160303_185155-removebg-preview.png',
  'DSC00482-removebg-preview.png',
  'DSC00489-removebg-preview.png',
  'DSC00491-removebg-preview.png',
  'DSC07321-removebg-preview.png',
  'IMG_20161026_162025_HDR-removebg-preview.png',
  'IMG_20170117_165033-removebg-preview.png',
  'IMG_20180329_040020-removebg-preview.png',
  'IMG_20180724_172228-removebg-preview.png',
  'IMG_20180724_175356-removebg-preview.png',
  'IMG_20230729_171100-removebg-preview.png',
  'IMG_20230803_180455-removebg-preview.png'
];

const Solutions3D = () => {
  return (
    <group>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
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

const SolutionsPage = () => {
  const solutions = [
    { 
      title: "Automated Gauging Systems",
      desc: "High-precision measurement solutions for manufacturing excellence"
    },
    { 
      title: "Precision Measurement Machines",
      desc: "Accurate and reliable measurement equipment for critical applications"
    },
    { 
      title: "Robotic Inspection Cells",
      desc: "Automated quality control powered by advanced robotics"
    },
    { 
      title: "Smart Manufacturing Analytics",
      desc: "Data-driven insights to optimize your production processes"
    },
    { 
      title: "AI-based SPC Systems",
      desc: "Statistical process control enhanced with artificial intelligence"
    },
    { 
      title: "Custom Automation Lines",
      desc: "Tailor-made automation solutions for your unique requirements"
    }
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
                Our <span className="text-blue-600">Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
                Cutting-edge automation solutions engineered for precision, scale, and reliability
              </p>
            </motion.div>
            <div className="h-[400px]">
              <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={50} />
                <OrbitControls enableZoom={true} enablePan={false} />
                <color attach="background" args={['#ffffff']} />
                <Environment preset="city" />
                <Solutions3D />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-[#050814]">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card p-8"
              >
                <h3 className="text-xl font-semibold mb-3 text-white">{solution.title}</h3>
                <p className="text-gray-400">{solution.desc}</p>
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
            Our Projects
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {previewImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card overflow-hidden"
              >
                <img
                  src={`/${image}`}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-48 object-contain p-4"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
