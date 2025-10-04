// web4/src/components/scanner/ScanbotBarcodeScanner.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { BarcodeScannerProps } from '../../types/scanner';
import { scanbotService } from '../../services/scanbotService';

const SCANBOT_CONTAINER_ID = 'scanbot-barcode-scanner-container';

export default function ScanbotBarcodeScanner({ onBarcodeDetected }: BarcodeScannerProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const initializedRef = useRef(false);

  // Initialize Scanbot SDK
  useEffect(() => {
    const initializeScanbot = async () => {
      if (initializedRef.current) return;

      try {
        console.log('Initializing Scanbot SDK...');
        
        // For development, use empty license key
        // For production, use your actual license key from Scanbot
        const success = await scanbotService.initialize(process.env.NEXT_PUBLIC_SCANBOT_LICENSE_KEY || '');
        // const success = await scanbotService.initialize();
        
        if (success) {
          setIsInitialized(true);
          initializedRef.current = true;
          console.log('Scanbot SDK initialized successfully');
        } else {
          setError('Failed to initialize barcode scanner');
        }
      } catch (err) {
        console.error('Scanbot initialization error:', err);
        setError('Erreur lors de l\'initialisation du scanner');
      }
    };

    initializeScanbot();

    // Cleanup on unmount
    return () => {
      if (initializedRef.current) {
        scanbotService.dispose();
      }
    };
  }, []);

  const startScanner = async () => {
    if (!isInitialized) {
      setError('Scanner non initialisé');
      return;
    }

    try {
      // Check camera permission first
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission('granted');

      // Create and start scanner
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await scanbotService.createBarcodeScanner(SCANBOT_CONTAINER_ID, (barcodes: any[]) => {
        if (barcodes.length > 0) {
          const barcode = barcodes[0];
          console.log('Barcode detected:', barcode);
          onBarcodeDetected(barcode.text);
          stopScanner();
        }
      });

      await scanbotService.startScanner();
      setIsScanning(true);
      setError(null);
    } catch (err) {
      console.error('Scanner start error:', err);
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Permission caméra refusée');
          setCameraPermission('denied');
        } else {
          setError('Erreur du scanner: ' + err.message);
        }
      }
    }
  };

  const stopScanner = async () => {
    try {
      await scanbotService.stopScanner();
      await scanbotService.disposeScanner();
      setIsScanning(false);
    } catch (err) {
      console.error('Scanner stop error:', err);
    }
  };

  const openCameraSettings = () => {
    setError(
      'Pour autoriser la caméra:\n\n' +
      '1. Cliquez sur l\'icône 🔒 à gauche de l\'URL\n' +
      '2. Sélectionnez "Autoriser l\'accès à la caméra"\n' +
      '3. Rechargez la page\n\n' +
      'Ou essayez un autre navigateur comme Chrome.'
    );
  };

  return (
    <div className="scanner-container">
      {/* Permission Request */}
      {cameraPermission === 'prompt' && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <div className="text-4xl mb-2">📷</div>
          <h3 className="font-semibold text-blue-800 mb-2">Accès à la caméra requis</h3>
          <p className="text-blue-700 text-sm mb-4">
            Pour scanner les codes-barres, l&apos;application a besoin d&apos;accéder à votre caméra.
          </p>
          <button
            onClick={startScanner}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Autoriser la caméra et démarrer
          </button>
        </div>
      )}

      {/* Scanner Preview */}
      <div className="scanner-preview border-2 border-blue-500 rounded-lg overflow-hidden relative">
        <div 
          id={SCANBOT_CONTAINER_ID}
          className="w-full h-64 bg-black flex items-center justify-center"
        >
          {!isScanning && (
            <div className="text-white text-center p-4">
              {cameraPermission !== 'granted' ? (
                <>
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-sm">Autorisez l&apos;accès à la caméra pour scanner</p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-2">📦</div>
                  <p>Prêt à scanner</p>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Scanner Overlay */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-32 border-2 border-green-500 rounded-lg relative">
              <div className="absolute -top-8 left-0 right-0 text-center text-green-500 text-sm">
                Alignez le code-barres ici
              </div>
              <div className="absolute -bottom-8 left-0 right-0 text-center text-green-500 text-xs">
                Détection automatique professionnelle
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
          <div className="mt-3 flex space-x-2">
            {error.includes('Permission') && (
              <>
                <button
                  onClick={startScanner}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Réessayer
                </button>
                <button
                  onClick={openCameraSettings}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                >
                  Instructions
                </button>
              </>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Recharger la page
            </button>
          </div>
        </div>
      )}

      {/* Scanner Controls */}
      <div className="scanner-controls mt-4 flex flex-wrap gap-2 justify-center">
        {cameraPermission === 'granted' && (
          <>
            {!isScanning ? (
              <button
                onClick={startScanner}
                disabled={!isInitialized}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInitialized ? '▶️ Démarrer le scanner' : '⏳ Initialisation...'}
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                ⏹️ Arrêter
              </button>
            )}
          </>
        )}
        
        {cameraPermission !== 'granted' && cameraPermission !== 'denied' && (
          <button
            onClick={startScanner}
            disabled={!isInitialized}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isInitialized ? '📷 Autoriser la caméra' : '⏳ Initialisation...'}
          </button>
        )}
        
        {/* Fallback manual buttons */}
        <button 
          onClick={() => onBarcodeDetected('1234567890123')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          📋 Test EAN-13
        </button>
        <button 
          onClick={() => onBarcodeDetected('12345678')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          📋 Test EAN-8
        </button>
      </div>

      {/* Instructions */}
      <div className="scanner-instructions mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Scanner professionnel:</h4>
        <ol className="text-yellow-700 text-sm list-decimal list-inside space-y-1">
          <li>Autorisez l&apos;accès à la caméra</li>
          <li>Démarrez le scanner</li>
          <li>Placez le code-barres dans le cadre vert</li>
          <li>Détection automatique instantanée</li>
          <li>Remplissez les informations du produit</li>
        </ol>
        <p className="text-yellow-600 text-xs mt-2">
          💡 Scanner professionnel avec détection haute précision
        </p>
      </div>

      {/* Scanner Status */}
      <div className="scanner-status mt-4 text-center">
        <p className="text-sm text-gray-600">
          {!isInitialized ? (
            <span className="text-orange-600">⏳ Initialisation du scanner...</span>
          ) : cameraPermission === 'denied' ? (
            <span className="text-red-600">❌ Accès caméra refusé</span>
          ) : cameraPermission !== 'granted' ? (
            <span className="text-orange-600">📷 Autorisation caméra requise</span>
          ) : isScanning ? (
            <span className="text-green-600">🔍 Scanner professionnel actif</span>
          ) : (
            <span className="text-gray-500">📱 Prêt à scanner</span>
          )}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Scanner professionnel Scanbot SDK
        </p>
      </div>
    </div>
  );
}