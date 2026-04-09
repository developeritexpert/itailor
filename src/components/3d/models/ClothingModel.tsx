'use client';

import React, { useMemo, useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useConfiguratorStore, ModelType } from '@/store/useConfiguratorStore';
import { MODELS_CONFIG, TEXTURES } from '@/lib/constants';

interface ClothingModelProps {
  modelType: ModelType;
}

export function ClothingModel({ modelType }: ClothingModelProps) {
  // 1. Get current configuration from Store for this specific model type
  const activeModel = useConfiguratorStore((state) => state.activeModel);
  const partConfig = useConfiguratorStore((state) => state.config[modelType]);
  
  // 2. Load the correct GLTF model based on prop
  const config = MODELS_CONFIG[modelType];
  const { scene } = useGLTF(config.path);

  // 3. Prepare textures to be loaded
  // We use the first texture of the model type if none is selected
  const defaultTextureUrl = TEXTURES[modelType][0].url;
  const textureUrl = partConfig.body.activeTexture?.url || defaultTextureUrl;
  const texture = useTexture(textureUrl);

  // Configure texture properties
  useMemo(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  // 4. Apply texture to the model
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        
        // Ensure new material to prevent shared state issues
        mesh.material = new THREE.MeshStandardMaterial({
          map: texture,
          color: partConfig.body.activeColor,
          roughness: 0.7,
          metalness: 0.1
        });
      }
    });
  }, [scene, texture, partConfig.body.activeColor]);

  return <primitive object={scene} />;
}

// Preload common models
useGLTF.preload(MODELS_CONFIG.shirt.path);
useGLTF.preload(MODELS_CONFIG.t_shirt.path);
