import { ModelType } from '@/store/useConfiguratorStore';

export interface ModelMetadata {
  id: ModelType;
  label: string;
  path: string; // Path to .glb file
  parts: string[]; // Mesh names in the GLB
  defaultCameraPosition: [number, number, number];
}

export const MODELS_CONFIG: Record<string, ModelMetadata> = {
  shirt: {
    id: 'shirt',
    label: 'Formal Shirt',
    path: '/models/shirt.glb',
    parts: ['body'],
    defaultCameraPosition: [0, 0, 4],
  },
  t_shirt: {
    id: 't_shirt',
    label: 'T-Shirt',
    path: '/models/t_shirt.glb',
    parts: ['body'],
    defaultCameraPosition: [0, 0, 4],
  },
  trouser: {
    id: 'trouser',
    label: 'Chino Trousers',
    path: '/models/trouser.glb',
    parts: ['waist', 'legs', 'pockets'],
    defaultCameraPosition: [0, 0, 8],
  },
};

export interface Texture {
  id: string;
  name: string;
  url: string;
}

export const TEXTURES: Record<string, Texture[]> = {
  shirt: [
    { id: 's1', name: 'Texture 1', url: '/textures/shirt/15209.jpg' },
    { id: 's2', name: 'Texture 2', url: '/textures/shirt/15210.jpg' },
    { id: 's3', name: 'Texture 3', url: '/textures/shirt/160441.jpg' },
    { id: 's4', name: 'Texture 4', url: '/textures/shirt/454786.jpg' },
  ],
  t_shirt: [
    { id: 'ts1', name: 'Texture 1', url: '/textures/t_shirt/15209.jpg' },
    { id: 'ts2', name: 'Texture 2', url: '/textures/t_shirt/15210.jpg' },
    { id: 'ts3', name: 'Texture 3', url: '/textures/t_shirt/756120-15.jpg' },
    { id: 'ts4', name: 'Texture 4', url: '/textures/t_shirt/756120-2.jpg' },
  ]
};

// Kept for backward compatibility, but we should move to the TEXTURES record
export const AVAILABLE_TEXTURES = TEXTURES.t_shirt;
