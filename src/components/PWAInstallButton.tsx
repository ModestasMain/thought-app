import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
    >
      <Download className="w-5 h-5" />
      <span>Install App</span>
    </button>
  );
};

export default PWAInstallButton;
