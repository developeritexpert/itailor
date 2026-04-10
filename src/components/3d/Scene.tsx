'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useConfiguratorStore, ModelType } from '@/store/useConfiguratorStore';
import { ClothingModel } from './models/ClothingModel';

/**
 * Lights Component
 * Strategic lighting for a premium studio look
 */
const Lights = () => {
  return (
    <>
      {/* Soft Fill Light */}
      <ambientLight intensity={0.5} />
      
      {/* Key Light - Adds volume and definition */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={2} 
        castShadow={false} // Performance optimization
      />

      {/* Rim Light - Separates the model from the background */}
      <spotLight 
        position={[-5, 5, -5]} 
        intensity={1.5} 
        angle={0.3} 
        penumbra={1} 
      />
    </>
  );
};

/**
 * Scene Entry Point
 * Handles renderer configuration and performance optimization
 */
export const Scene = ({ modelType }: { modelType: ModelType }) => {
  const isAutoRotate = useConfiguratorStore((state) => state.isAutoRotate);

  return (
    <Canvas
      shadows={false} // Disabled for max performance
      dpr={[1, 2]} // Performance: limit pixel ratio on high-res screens
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true,
        toneMapping: THREE.ACESFilmicToneMapping, // Professional color grading
        toneMappingExposure: 1.2, // Adjust brightness
        outputColorSpace: THREE.SRGBColorSpace // Essential for color accuracy
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
      
      <Lights />

      <Suspense fallback={null}>
        {/* Studio HDRI Environment for realistic fabric reflections */}
        <Environment preset="studio" blur={0.5} />
        
        {/* Stage handles centering, scaling and soft ground shadows */}
        <Stage 
          environment={null} // We use our own environment
          intensity={0.5} 
          adjustCamera={true} 
          shadows={false}
          center
        >
          <ClothingModel modelType={modelType} />
        </Stage>

        {/* High-performance soft contact shadow at the base */}
        <ContactShadows 
          opacity={0.4} 
          scale={10} 
          blur={2.5} 
          far={4} 
          resolution={256} 
          color="#000000" 
        />
      </Suspense>

      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        autoRotate={isAutoRotate}
        autoRotateSpeed={0.5}
        makeDefault
        minDistance={3}
        maxDistance={25}
      />
    </Canvas>
  );
};
