import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstall(false);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled || !showInstall) return null;

  return (
    <>
      {/* Fixed bottom button */}
      <button
        onClick={handleInstall}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
      >
        <Download className="h-5 w-5" />
        Install App
      </button>

      {/* Banner at the top */}
      <div className="fixed top-0 left-0 right-0 bg-indigo-600 text-white py-2 px-4 flex items-center justify-between shadow-lg">
        <p className="text-sm">📱 Install our app for a better experience!</p>
        <button
          onClick={handleInstall}
          className="bg-white text-indigo-600 px-3 py-1 rounded text-sm font-medium hover:bg-indigo-50 transition-colors"
        >
          Install Now
        </button>
      </div>
    </>
  );
}