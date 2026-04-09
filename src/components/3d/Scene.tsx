'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, ContactShadows, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { ClothingModel } from './models/ClothingModel';
import { ModelType } from '@/store/useConfiguratorStore';

export const Scene = ({ modelType }: { modelType: ModelType }) => {
  const isAutoRotate = useConfiguratorStore((state) => state.isAutoRotate);

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      
      <Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} shadows={false}>
          <ClothingModel modelType={modelType} />
        </Stage>
      </Suspense>

      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 2} 
        autoRotate={isAutoRotate}
      />
    </Canvas>
  );
};
