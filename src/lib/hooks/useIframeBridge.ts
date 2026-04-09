'use client';

import { useEffect } from 'react';
import { useConfiguratorStore, ModelType } from '@/store/useConfiguratorStore';

/**
 * useIframeBridge
 * Allows the parent window to control the 3D configurator via window.postMessage.
 * 
 * Example usage from parent:
 * iframe.contentWindow.postMessage({ type: 'SET_MODEL', payload: 'trouser' }, '*');
 */
export const useIframeBridge = () => {
  const { setActiveModel, updatePartColor, setAutoRotate } = useConfiguratorStore();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Logic for security: Optional check for allowed origins
      // if (event.origin !== 'https://your-trusted-site.com') return;

      const { type, payload } = event.data;

      switch (type) {
        case 'SET_MODEL':
          setActiveModel(payload as ModelType);
          break;
        case 'SET_COLOR':
          // payload expected as { model: 'shirt', part: 'body', color: '#ff0000' }
          if (payload.model && payload.part && payload.color) {
            updatePartColor(payload.model, payload.part, payload.color);
          }
          break;
        case 'SET_AUTO_ROTATE':
          setAutoRotate(!!payload);
          break;
        default:
          // Optional: Handle unknown message types
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Notify parent that the configurator is ready
    window.parent.postMessage({ type: 'CONFIGURATOR_READY' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, [setActiveModel, updatePartColor, setAutoRotate]);
};
