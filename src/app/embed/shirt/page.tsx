'use client';

import { Scene } from '@/components/3d/Scene';
import { Configurator } from '@/components/ui/Configurator';
import { useIframeBridge } from '@/lib/hooks/useIframeBridge';

export default function ShirtEmbedPage() {
  // Initialize the communication bridge for iframe control
  useIframeBridge();

  return (
    <main className="relative w-full h-screen bg-zinc-50 overflow-hidden">
      {/* 3D Viewport */}
      <div className="absolute inset-0">
        <Scene />
      </div>

      {/* UI Overlay */}
      <Configurator />

      {/* Branding / Badge (Optional) */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
          iTailor
        </h1>
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">
          3D Visualizer
        </p>
      </div>
    </main>
  );
}
