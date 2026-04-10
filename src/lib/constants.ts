import { ModelType } from '@/store/useConfiguratorStore';

export interface ModelMetadata {
  id: string;
  label: string;
  path: string;
  parts: string[];
  meshMap: Record<string, string[]>; // Logical Part -> GLB Mesh Names
  defaultCameraPosition: [number, number, number];
}

export const MODELS_CONFIG: Record<string, ModelMetadata> = {
  shirt: {
    id: 'shirt',
    label: 'Formal Shirt',
    path: '/models/shirt.glb',
    parts: ['body', 'sleeves', 'collar', 'pocket', 'buttons'],
    meshMap: {
      body: ['Object_2', 'Object_3'],
      sleeves: ['Object_4', 'Object_5'],
      collar: ['Object_6', 'Object_7'],
      pocket: ['Object_8'],
      buttons: ['Object_9', 'Object_10', 'Object_11'],
    },
    defaultCameraPosition: [0, 0, 5],
  },
  t_shirt: {
    id: 't_shirt',
    label: 'T-Shirt',
    path: '/models/t_shirt.glb',
    parts: ['body', 'sleeves', 'neck'],
    meshMap: {
      body: ['Object_2'],
      sleeves: ['Object_3', 'Object_4'],
      neck: ['Object_5', 'Object_6'],
    },
    defaultCameraPosition: [0, 0, 4],
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
