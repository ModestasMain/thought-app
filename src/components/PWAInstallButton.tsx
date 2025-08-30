import React, { useState, useEffect } from 'react';
import { Download, Info } from 'lucide-react';

const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    // Check if PWA is already installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    if (isInstalled) {
      setDebugInfo('App is already installed as PWA');
      return;
    }

    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) {
      setDebugInfo('Service Worker not supported');
      return;
    }

    // Check if PWA install is supported
    if (!('BeforeInstallPromptEvent' in window)) {
      setDebugInfo('PWA install not supported in this browser');
      setShowInstallButton(true); // Show manual install option
      return;
    }

    const handler = (e: Event) => {
      console.log('beforeinstallprompt event fired!');
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
      setDebugInfo('PWA install prompt available');
    };

    window.addEventListener('beforeinstallprompt', handler);
    setDebugInfo('Waiting for PWA install prompt...');

    // Also show button after a delay if no prompt comes
    const timer = setTimeout(() => {
      if (!deferredPrompt) {
        setShowInstallButton(true);
        setDebugInfo('No PWA prompt detected, showing manual install');
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
          setDebugInfo('Install accepted!');
        } else {
          console.log('User dismissed the install prompt');
          setDebugInfo('Install dismissed by user');
        }
        
        setDeferredPrompt(null);
        setShowInstallButton(false);
      } catch (error) {
        console.error('Error during install:', error);
        setDebugInfo('Install error: ' + error);
      }
    } else {
      // Manual install instructions
      setDebugInfo('Manual install: Use browser menu → "Add to Home Screen"');
    }
  };

  const handleManualInstall = () => {
    setDebugInfo('Manual install: Use browser menu → "Add to Home Screen" or "Install App"');
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          className="bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Install App</span>
        </button>
      )}
      
      <button
        onClick={handleManualInstall}
        className="bg-gray-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 text-sm"
      >
        <Info className="w-4 h-4" />
        <span>How to Install</span>
      </button>
      
      {debugInfo && (
        <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm max-w-xs text-center">
          {debugInfo}
        </div>
      )}
    </div>
  );
};

export default PWAInstallButton;
