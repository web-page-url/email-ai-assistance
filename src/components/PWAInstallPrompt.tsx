'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    // Check if already in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        (window.navigator as any).standalone ||
                        document.referrer.includes('android-app://');
    setIsInStandaloneMode(isStandalone);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show install prompt after a delay if not dismissed before
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-install-dismissed');
        if (!dismissed && !isStandalone) {
          setShowInstallPrompt(true);
        }
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted PWA install');
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already in standalone mode or no install prompt available
  if (isInStandaloneMode || (!deferredPrompt && !isIOS) || !showInstallPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50">
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-2xl p-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Download className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 mb-1">
              Install Email AI Assistant
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              {isIOS 
                ? 'Add to your home screen for quick access. Tap the share button and select "Add to Home Screen".'
                : 'Install our app for faster access and offline functionality.'
              }
            </p>
            
            <div className="flex gap-2">
              {!isIOS && (
                <button
                  onClick={handleInstallClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200"
                >
                  Install App
                </button>
              )}
              
              <button
                onClick={handleDismiss}
                className="text-slate-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}