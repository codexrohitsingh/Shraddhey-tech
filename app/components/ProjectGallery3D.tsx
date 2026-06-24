'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, Environment, Text } from '@react-three/drei';

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

interface ProjectCardProps {
  index: number;
  total: number;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ index, total, image, isSelected, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(`/${image}`, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      setTexture(tex);
    }, undefined, (error) => {
      console.error('Error loading texture:', error);
    });
  }, [image]);

  const angle = (index / total) * Math.PI * 2;
  const radius = 8;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  const targetScale = isSelected ? 2.5 : 1;
  const targetPosition = isSelected ? [0, 0, 0] : [x, 0, z];
  const targetRotation = isSelected ? [0, 0, 0] : [0, -angle, 0];

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.lerp(new THREE.Vector3(...targetPosition), 0.08);
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotation[0], 0.08);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation[1], 0.08);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotation[2], 0.08);
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={hovered || isSelected ? 0.2 : 0.05}
      floatIntensity={hovered || isSelected ? 0.3 : 0.1}
    >
      <group ref={meshRef}>
        {/* Invisible clickable area */}
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>

        {/* Image mesh */}
        {texture && (
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[2.6, 1.9]} />
            <meshBasicMaterial 
              map={texture} 
              transparent 
              side={THREE.DoubleSide}
              color={hovered || isSelected ? "#ffffff" : "#f0f0f0"}
            />
          </mesh>
        )}

        {/* Border/glow */}
        <mesh>
          <planeGeometry args={[3.1, 2.1]} />
          <meshBasicMaterial 
            color={hovered || isSelected ? "#60a5fa" : "#2563eb"} 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
};

interface GalleryContentProps {
  sectionColor: string;
  selectedIndex: number | null;
  onProjectClick: (index: number) => void;
}

const GalleryContent: React.FC<GalleryContentProps> = ({ sectionColor, selectedIndex, onProjectClick }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (selectedIndex !== null) {
      camera.position.lerp(new THREE.Vector3(0, 0, 15), 0.05);
    } else {
      camera.position.lerp(new THREE.Vector3(0, 3, 15), 0.05);
    }
  }, [selectedIndex, camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 15]} fov={50} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={selectedIndex === null}
        minDistance={10}
        maxDistance={30}
      />
      <color attach="background" args={[sectionColor]} />
      <Environment preset="city" />

      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#60a5fa" />
      <pointLight position={[-10, 5, 10]} intensity={1.5} color="#2563eb" />
      <pointLight position={[0, -10, 5]} intensity={1} color="#60a5fa" />

      {previewImages.map((image, index) => (
        <ProjectCard
          key={index}
          index={index}
          total={previewImages.length}
          image={image}
          isSelected={selectedIndex === index}
          onClick={() => onProjectClick(index)}
        />
      ))}

      {selectedIndex !== null && (
        <group position={[0, -2, 0]}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Click again to close
          </Text>
        </group>
      )}
    </>
  );
};

interface ProjectGallery3DWrapperProps {
  sectionColor: string;
}

export const ProjectGallery3D: React.FC<ProjectGallery3DWrapperProps> = ({ sectionColor }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleProjectClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  return (
    <div className="relative w-full h-full">
      <Suspense fallback={null}>
        <Canvas shadows dpr={[1, 2]}>
          <GalleryContent 
            sectionColor={sectionColor}
            selectedIndex={selectedIndex}
            onProjectClick={handleProjectClick}
          />
        </Canvas>
      </Suspense>

      {/* Modal for full-size image */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-blue-400 transition-colors z-10"
            onClick={closeModal}
          >
            ×
          </button>
          <img
            src={`/${previewImages[selectedIndex]}`}
            alt="Full-size project"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
