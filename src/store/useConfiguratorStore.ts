import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

/**
 * High-Level Types
 */

export type ModelType = 'shirt' | 't_shirt' | 'trouser';

export interface TextureConfig {
  id: string;
  name: string;
  url: string;
  color?: string;
}

export interface PartConfig {
  fabric: TextureConfig | null;
  color: string;
  visible: boolean;
}

export interface ConfiguratorState {
  // --- State ---
  activeModel: ModelType;
  activePart: string; // The part currently being edited in the UI (e.g., 'collar')
  
  // Nested config: [modelType][partName]
  config: Record<ModelType, Record<string, PartConfig>>;
  
  isAutoRotate: boolean;
  isLoading: boolean;

  // --- Actions ---
  setActiveModel: (model: ModelType) => void;
  setActivePart: (part: string) => void;
  
  // Precision update: Update a specific part of a specific model
  updatePartConfig: (
    model: ModelType, 
    partName: string, 
    updates: Partial<PartConfig>
  ) => void;

  setAutoRotate: (active: boolean) => void;
  setLoading: (loading: boolean) => void;
  
  // Helper to reset a whole model
  resetModel: (model: ModelType) => void;
}

/**
 * Default Initial State
 */

const createDefaultPart = (): PartConfig => ({
  fabric: null,
  color: '#ffffff',
  visible: true,
});

const INITIAL_CONFIG: Record<ModelType, Record<string, PartConfig>> = {
  shirt: {
    body: createDefaultPart(),
    collar: createDefaultPart(),
    sleeves: createDefaultPart(),
    pocket: createDefaultPart(),
    buttons: { ...createDefaultPart(), color: '#eeeeee' },
  },
  t_shirt: {
    body: createDefaultPart(),
    sleeves: createDefaultPart(),
    neck: createDefaultPart(),
  },
  trouser: {
    waist: createDefaultPart(),
    legs: createDefaultPart(),
    pockets: createDefaultPart(),
  },
};

export const useConfiguratorStore = create<ConfiguratorState>()(
  devtools(
    subscribeWithSelector((set) => ({
      // --- Initial State ---
      activeModel: 'shirt',
      activePart: 'body',
      config: INITIAL_CONFIG,
      isAutoRotate: false,
      isLoading: false,

      // --- Actions ---
      setActiveModel: (model) => set({ activeModel: model, activePart: 'body' }, false, 'setActiveModel'),
      
      setActivePart: (part) => set({ activePart: part }, false, 'setActivePart'),

      updatePartConfig: (model, partName, updates) => 
        set((state) => ({
          config: {
            ...state.config,
            [model]: {
              ...state.config[model],
              [partName]: {
                ...state.config[model][partName],
                ...updates
              }
            }
          }
        }), false, `update/${model}/${partName}`),

      setAutoRotate: (active) => set({ isAutoRotate: active }, false, 'setAutoRotate'),
      
      setLoading: (loading) => set({ isLoading: loading }, false, 'setLoading'),

      resetModel: (model) => 
        set((state) => ({
          config: {
            ...state.config,
            [model]: INITIAL_CONFIG[model]
          }
        }), false, `reset/${model}`)
    }))
  )
);
