'use client';

import React, { useMemo, useEffect } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useConfiguratorStore, ModelType, PartConfig } from '@/store/useConfiguratorStore';
import { MODELS_CONFIG } from '@/lib/constants';

interface ClothingModelProps {
  modelType: ModelType;
}

/**
 * Performance-Optimized Part Renderer
 * Optimized for PBR rendering with high-quality textures
 */
const PartRenderer = ({ 
  meshNames, 
  config, 
  nodes,
  highlight = false
}: { 
  meshNames: string[], 
  config: PartConfig, 
  nodes: Record<string, THREE.Object3D>,
  highlight?: boolean
}) => {
  // Use a high-quality default fabric texture
  const defaultTextureUrl = '/textures/shirt/15209.jpg';
  const textureUrl = config.fabric?.url || defaultTextureUrl;
  
  // DRYS: only load what is needed
  const texture = useTexture(textureUrl);

  // Performance: memoize texture configuration
  useMemo(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace; // Critical for non-washed colors
      texture.anisotropy = 16; // Optimized sharpness at flat angles
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
    }
  }, [texture, textureUrl]);

  // Premium Material: Using MeshStandardMaterial with PBR logic
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      color: highlight ? '#fbbf24' : config.color, // Gold highlight for selecting
      roughness: 0.85, // High roughness for realistic fabric look
      metalness: 0.05, // Slight metallic sheen for some fabrics
      emissive: highlight ? '#fbbf24' : '#000000',
      emissiveIntensity: highlight ? 0.35 : 0,
      envMapIntensity: 0.8, // Respect global studio reflective map
      side: THREE.DoubleSide,
      transparent: false,
    });
  }, [texture, config.color, highlight]);

  if (!config.visible) return null;

  return (
    <>
      {meshNames.map((name) => {
        const node = nodes[name] as THREE.Mesh;
        if (!node) return null;
        
        return (
          <mesh
            key={name}
            geometry={node.geometry}
            material={material}
            position={node.position}
            rotation={node.rotation}
            scale={node.scale}
            frustumCulled={true} // Performance: only render if on screen
          />
        );
      })}
    </>
  );
};


export function ClothingModel({ modelType }: ClothingModelProps) {
  const modelConfig = MODELS_CONFIG[modelType];
  const { nodes } = useGLTF(modelConfig.path);
  const partsConfig = useConfiguratorStore((state) => state.config[modelType]);
  const activePart = useConfiguratorStore((state) => state.activePart);

  // Performance: only identify meshes once
  const mappedMeshNames = useMemo(() => Object.values(modelConfig.meshMap).flat(), [modelConfig.meshMap]);
  const unmappedMeshNames = useMemo(() => {
    return Object.keys(nodes).filter(key => 
      (nodes[key] as any).isMesh && !mappedMeshNames.includes(key)
    );
  }, [nodes, mappedMeshNames]);

  return (
    // Applied standing-up rotation correction
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Precision Rendering: Each part has its own performance scope */}
      {Object.entries(modelConfig.meshMap).map(([partKey, meshNames]) => (
        <PartRenderer 
          key={partKey}
          meshNames={meshNames}
          config={partsConfig[partKey]}
          nodes={nodes}
          highlight={activePart === partKey}
        />
      ))}

      {/* Fallback rendering for any unmapped meshes */}
      {unmappedMeshNames.length > 0 && (
        <PartRenderer 
          meshNames={unmappedMeshNames}
          config={partsConfig.body}
          nodes={nodes}
        />
      )}
    </group>
  );
}

// Low-latency Preloading
useGLTF.preload(MODELS_CONFIG.shirt.path);
useGLTF.preload(MODELS_CONFIG.t_shirt.path);
