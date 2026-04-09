'use client';

import React from 'react';
import { useConfiguratorStore } from '@/store/useConfiguratorStore';
import { AVAILABLE_TEXTURES } from '@/lib/constants';

export const Configurator = () => {
  const { updatePartTexture, config, isAutoRotate, setAutoRotate } = useConfiguratorStore();
  const currentTexture = config.shirt.body.activeTexture;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-2xl px-4">
      <div className="bg-white/80 backdrop-blur-lg border border-zinc-200 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-zinc-900">Customize T-Shirt</h2>
          <button 
            onClick={() => setAutoRotate(!isAutoRotate)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              isAutoRotate ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-600'
            }`}
          >
            {isAutoRotate ? 'Stop Rotation' : 'Auto Rotate'}
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Available Textures</p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {AVAILABLE_TEXTURES.map((texture) => (
              <button
                key={texture.id}
                onClick={() => updatePartTexture('shirt', 'body', texture)}
                className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  currentTexture?.id === texture.id ? 'border-indigo-600 scale-105 shadow-lg' : 'border-transparent hover:border-zinc-300'
                }`}
              >
                <img 
                  src={texture.url} 
                  alt={texture.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
