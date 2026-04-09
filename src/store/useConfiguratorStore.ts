import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

/**
 * Types for the Configurator
 */

export type ModelType = 'shirt' | 't_shirt' | 'trouser' | 'shoes'; // Expandable

export interface TextureConfig {
  id: string;
  name: string;
  url: string;
  color?: string;
}

export interface ModelPartConfig {
  partName: string;
  activeTexture: TextureConfig | null;
  activeColor: string;
}

export interface ConfiguratorState {
  // --- State ---
  activeModel: ModelType;
  config: Record<ModelType, Record<string, ModelPartConfig>>; // parts mapped by model type
  isAutoRotate: boolean;
  isLoading: boolean;
  cameraPosition: [number, number, number];

  // --- Actions ---
  setActiveModel: (model: ModelType) => void;
  updatePartTexture: (model: ModelType, partName: string, texture: TextureConfig) => void;
  updatePartColor: (model: ModelType, partName: string, color: string) => void;
  resetModelConfig: (model: ModelType) => void;
  setAutoRotate: (active: boolean) => void;
  setLoading: (loading: boolean) => void;
  setCameraPosition: (pos: [number, number, number]) => void;
}

/**
 * Initial State Definitions
 * This can be moved to a constants file later
 */

const DEFAULT_CONFIG: Record<ModelType, Record<string, ModelPartConfig>> = {
  shirt: {
    body: { partName: 'body', activeTexture: null, activeColor: '#ffffff' },
  },
  t_shirt: {
    body: { partName: 'body', activeTexture: null, activeColor: '#ffffff' },
  },
  trouser: {
    waist: { partName: 'waist', activeTexture: null, activeColor: '#333333' },
    legs: { partName: 'legs', activeTexture: null, activeColor: '#333333' },
    pockets: { partName: 'pockets', activeTexture: null, activeColor: '#333333' },
  },
  shoes: {
    sole: { partName: 'sole', activeTexture: null, activeColor: '#111111' },
    upper: { partName: 'upper', activeTexture: null, activeColor: '#eeeeee' },
    laces: { partName: 'laces', activeTexture: null, activeColor: '#ffffff' },
  },
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // --- Initial State ---
      activeModel: 'shirt',
      config: DEFAULT_CONFIG,
      isAutoRotate: false,
      isLoading: false,
      cameraPosition: [5, 2, 5],

      // --- Actions ---
      setActiveModel: (model) => set({ activeModel: model }, false, 'setActiveModel'),

      updatePartTexture: (model, partName, texture) =>
        set(
          (state) => ({
            config: {
              ...state.config,
              [model]: {
                ...state.config[model],
                [partName]: {
                  ...state.config[model][partName],
                  activeTexture: texture,
                },
              },
            },
          }),
          false,
          `updatePartTexture/${model}/${partName}`
        ),

      updatePartColor: (model, partName, color) =>
        set(
          (state) => ({
            config: {
              ...state.config,
              [model]: {
                ...state.config[model],
                [partName]: {
                  ...state.config[model][partName],
                  activeColor: color,
                },
              },
            },
          }),
          false,
          `updatePartColor/${model}/${partName}`
        ),

      resetModelConfig: (model) =>
        set(
          (state) => ({
            config: {
              ...state.config,
              [model]: DEFAULT_CONFIG[model],
            },
          }),
          false,
          `resetModelConfig/${model}`
        ),

      setAutoRotate: (active) => set({ isAutoRotate: active }, false, 'setAutoRotate'),

      setLoading: (loading) => set({ isLoading: loading }, false, 'setLoading'),

      setCameraPosition: (pos) => set({ cameraPosition: pos }, false, 'setCameraPosition'),
    }))
  )
);
