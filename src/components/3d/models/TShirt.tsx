'use client';

import React, { useMemo } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { MODELS_CONFIG } from '@/lib/constants';

export function TShirt() {
  // 1. Get current configuration from Store
  const activeModel = useConfiguratorStore((state) => state.activeModel);
  const partConfig = useConfiguratorStore((state) => state.config.shirt);
  
  // 2. Load the GLTF model
  const modelPath = MODELS_CONFIG.shirt.path;
  const { scene } = useGLTF(modelPath);

  // 3. Prepare textures to be loaded
  const textureUrl = partConfig.body.activeTexture?.url || '/textures/t_shirt/15209.jpg';
  const texture = useTexture(textureUrl);

  // Configure texture for best look
  useMemo(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  // 4. Apply texture to the model
  // This logic iterates through all meshes in the GLB and applies the selected texture.
  // This is highly reusable even if the mesh names change.
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // We create a new material to avoid affecting other instances if any
        mesh.material = new THREE.MeshStandardMaterial({
          map: texture,
          color: partConfig.body.activeColor,
          roughness: 0.5,
          metalness: 0
        });
      }
    });
  }, [scene, texture, partConfig.body.activeColor]);

  return <primitive object={scene} />;
}

// Preload the model
useGLTF.preload(MODELS_CONFIG.shirt.path);
