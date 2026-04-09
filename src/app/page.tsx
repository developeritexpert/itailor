'use client';

import React, { useRef } from 'react';

export default function Home() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendMessageToIframe = (type: string, payload: any) => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({ type, payload }, '*');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-zinc-900 tracking-tight">iTailor Embed Guide</h1>
            <p className="text-zinc-500 mt-2">See how to integrate the 3D configurator into your website.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => sendMessageToIframe('SET_AUTO_ROTATE', true)}
              className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors"
            >
              Start Rotation
            </button>
            <button 
              onClick={() => sendMessageToIframe('SET_AUTO_ROTATE', false)}
              className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors"
            >
              Stop Rotation
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Live Preview Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-800">1. Live Preview</h2>
            <div className="relative aspect-square md:aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                ref={iframeRef}
                src="/embed/shirt" 
                className="w-full h-full"
                title="iTailor Configurator"
                frameBorder="0"
              />
            </div>
            <p className="text-sm text-zinc-500 italic">
              Try clicking the buttons above to control the model inside the iframe!
            </p>
          </div>

          {/* Integration Guide Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-800">2. Implementation Shell</h2>
            
            <div className="bg-zinc-900 rounded-2xl p-6 text-zinc-300 font-mono text-sm overflow-x-auto">
              <p className="text-zinc-500 mb-2">// Basic Embed</p>
              <code className="block text-indigo-400">
                {`<iframe 
  src="https://your-domain.com/embed/shirt" 
  width="100%" 
  height="600px" 
  frameborder="0"
></iframe>`}
              </code>

              <p className="text-zinc-500 mt-6 mb-2">// Controlling From Parent JS</p>
              <code className="block text-emerald-400">
                {`const iframe = document.querySelector('iframe');

// Change Color
iframe.contentWindow.postMessage({
  type: 'SET_COLOR',
  payload: { model: 'shirt', part: 'body', color: '#FF0000' }
}, '*');

// Toggle Auto Rotate
iframe.contentWindow.postMessage({
  type: 'SET_AUTO_ROTATE',
  payload: true
}, '*');`}
              </code>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h3 className="text-blue-800 font-bold text-sm mb-1 uppercase tracking-wider">Pro Tip</h3>
              <p className="text-blue-700 text-sm">
                Use the <span className="font-mono font-bold">postMessage</span> API to sync the 3D model with your existing e-commerce shop's checkout buttons.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
