import { ModelType } from '@/store/useConfiguratorStore';

export interface ModelMetadata {
  id: ModelType;
  label: string;
  path: string; // Path to .glb file
  parts: string[]; // Mesh names in the GLB
  defaultCameraPosition: [number, number, number];
}

export const MODELS_CONFIG: Record<ModelType, ModelMetadata> = {
  shirt: {
    id: 'shirt',
    label: 'Formal Shirt',
    path: '/models/t_shirt.glb',
    parts: ['body'], // We'll make this flexible
    defaultCameraPosition: [0, 0, 4],
  },
  trouser: {
    id: 'trouser',
    label: 'Chino Trousers',
    path: '/models/trouser.glb',
    parts: ['waist', 'legs', 'pockets'],
    defaultCameraPosition: [0, 0, 8],
  },
  shoes: {
    id: 'shoes',
    label: 'Leather Shoes',
    path: '/models/shoes.glb',
    parts: ['sole', 'upper', 'laces'],
    defaultCameraPosition: [0, 0, 3],
  },
};

export const AVAILABLE_TEXTURES = [
  { id: 'tshirt-1', name: 'Texture 1', url: '/textures/t_shirt/15209.jpg' },
  { id: 'tshirt-2', name: 'Texture 2', url: '/textures/t_shirt/15210.jpg' },
  { id: 'tshirt-3', name: 'Texture 3', url: '/textures/t_shirt/160441.jpg' },
  { id: 'tshirt-4', name: 'Texture 4', url: '/textures/t_shirt/454786.jpg' },
  { id: 'tshirt-5', name: 'Texture 5', url: '/textures/t_shirt/454789.jpg' },
  { id: 'tshirt-6', name: 'Texture 6', url: '/textures/t_shirt/756120-15.jpg' },
  { id: 'tshirt-7', name: 'Texture 7', url: '/textures/t_shirt/756120-2.jpg' },
];
