'use client';

import React, { use } from 'react';
import { Scene } from '@/components/3d/Scene';
import { Configurator } from '@/components/ui/Configurator';
import { CircularLoader } from '@/components/ui/CircularLoader';
import { useIframeBridge } from '@/lib/hooks/useIframeBridge';
import { ModelType } from '@/store/useConfiguratorStore';
import { notFound } from 'next/navigation';

export default function EmbedPage({ params }: { params: Promise<{ modelType: string }> }) {
  const resolvedParams = use(params);
  const modelType = resolvedParams.modelType as ModelType;

  // Validate model type
  const validTypes: ModelType[] = ['shirt', 't_shirt', 'trouser'];
  if (!validTypes.includes(modelType)) {
    return notFound();
  }

  // Initialize the communication bridge for iframe control
  useIframeBridge();

  return (
    <main className="relative w-full h-screen bg-zinc-50 overflow-hidden">
      <CircularLoader size={120} strokeWidth={6} color="#fbbf24" />
      
      {/* 3D Viewport */}
      <div className="absolute inset-0">
        <Scene modelType={modelType} />
      </div>

      {/* UI Overlay */}
      <Configurator modelType={modelType} />

      {/* Branding */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          iTailor
        </h1>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">
          {modelType.replace('_', ' ')} Visualizer
        </p>
      </div>
    </main>
  );
}
