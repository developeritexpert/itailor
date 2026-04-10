'use client';

import React from 'react';
import { useConfiguratorStore, ModelType } from '@/store/useConfiguratorStore';
import { TEXTURES, MODELS_CONFIG } from '@/lib/constants';

export const Configurator = ({ modelType }: { modelType: ModelType }) => {
  const { 
    updatePartConfig, 
    config, 
    activePart, 
    setActivePart,
    isAutoRotate, 
    setAutoRotate 
  } = useConfiguratorStore();

  const modelMetadata = MODELS_CONFIG[modelType];
  const currentPartConfig = config[modelType][activePart];
  const availableTextures = TEXTURES[modelType] || [];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-4xl px-4 pointer-events-none">
      <div className="bg-white/90 backdrop-blur-xl border border-zinc-200 rounded-3xl p-6 shadow-2xl flex flex-col gap-6 pointer-events-auto">
        
        {/* Header & Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tighter">
              {modelMetadata.label}
            </h2>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Customization Studio
            </p>
          </div>
          <button 
            onClick={() => setAutoRotate(!isAutoRotate)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              isAutoRotate ? 'bg-amber-500 text-white' : 'bg-zinc-100 text-zinc-400'
            }`}
          >
            {isAutoRotate ? 'Stop Rotation' : 'Auto Rotate'}
          </button>
        </div>

        {/* Part Selector - The Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {modelMetadata.parts.map((part) => (
            <button
              key={part}
              onClick={() => setActivePart(part)}
              className={`px-6 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${
                activePart === part 
                  ? 'bg-zinc-900 text-white shadow-lg' 
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
              }`}
            >
              {part}
            </button>
          ))}
        </div>

        {/* Texture/Fabric Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Select Fabric for {activePart}
            </p>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {availableTextures.map((texture) => (
              <button
                key={texture.id}
                onClick={() => updatePartConfig(modelType, activePart, { fabric: texture })}
                className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  currentPartConfig?.fabric?.id === texture.id 
                    ? 'border-amber-500 scale-110 shadow-xl z-10' 
                    : 'border-transparent hover:border-zinc-300'
                }`}
              >
                <img 
                  src={texture.url} 
                  alt={texture.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 py-1 bg-black/40 text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {texture.name}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
