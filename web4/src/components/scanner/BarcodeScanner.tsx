// web4/src/components/scanner/BarcodeScanner.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface BarcodeScannerProps {
  onBarcodeDetected: (code: string) => void;
}

interface QuaggaError {
  message: string;
}

interface QuaggaResult {
  codeResult: {
    code: string;
    format: string;
  };
}

interface QuaggaConfig {
  inputStream: {
    name: string;
    type: string;
    target: HTMLElement | null;
    constraints?: {
      facingMode?: string;
      width?: { min: number; ideal: number; max: number };
      height?: { min: number; ideal: number; max: number };
    };
  };
  decoder: {
    readers: string[];
  };
  locate?: boolean;
  frequency?: number;
  numOfWorkers?: number;
}

interface QuaggaProcessedResult {
  boxes?: unknown[];
  codeResult?: {
    code: string;
    format: string;
  };
}

// Define a compatible Quagga interface without any types
interface CompatibleQuagga {
  init: (config: QuaggaConfig, callback: (err: QuaggaError | null) => void) => void;
  start: () => void;
  stop: () => void;
  onDetected: (callback: (result: QuaggaResult) => void) => void;
  offDetected: (callback?: (result: QuaggaResult) => void) => void;
  onProcessed?: (callback: (result: QuaggaProcessedResult) => void) => void;
  offProcessed?: (callback?: (result: QuaggaProcessedResult) => void) => void;
}

export default function BarcodeScanner({ onBarcodeDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quagga, setQuagga] = useState<CompatibleQuagga | null>(null);

  // Load Quagga dynamically
  useEffect(() => {
    const loadQuagga = async () => {
      try {
        const QuaggaModule = await import('quagga');
        // Use type assertion to match our interface
        const loadedQuagga = (QuaggaModule.default || QuaggaModule) as CompatibleQuagga;
        setQuagga(loadedQuagga);
      } catch (err) {
        console.error('Failed to load Quagga:', err);
        setError('Impossible de charger le module de scan');
      }
    };

    loadQuagga();
  }, []);

  // Debounce function to prevent multiple detections
  const debouncedDetection = useCallback((code: string) => {
    console.log('🎯 Barcode detected:', code);
    onBarcodeDetected(code);
    // Stop scanning after successful detection
    if (quagga) {
      quagga.stop();
      setIsScanning(false);
    }
  }, [onBarcodeDetected, quagga]);

  useEffect(() => {
    const initQuagga = async () => {
      if (!videoRef.current || isInitialized || !quagga) return;

      try {
        // Check if camera is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setError('Votre appareil ne supporte pas l\'accès à la caméra');
          return;
        }

        quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: videoRef.current,
              constraints: {
                facingMode: 'environment', // Use rear camera
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 720, max: 1080 },
              },
            },
            decoder: {
              readers: [
                'ean_reader',
                'ean_8_reader',
                'upc_reader',
                'upc_e_reader',
                'code_128_reader'
              ],
            },
            locate: true,
            frequency: 10, // Check every 10 frames
          },
          (err: QuaggaError | null) => {
            if (err) {
              console.error('Quagga initialization error:', err);
              setError(`Erreur d'initialisation du scanner: ${err.message}`);
              return;
            }
            
            console.log('✅ Quagga initialized successfully');
            setIsInitialized(true);
            
            // Start scanning automatically
            quagga.start();
            setIsScanning(true);
          }
        );

        // Handle barcode detection
        quagga.onDetected((result: QuaggaResult) => {
          const code = result.codeResult.code;
          if (code) {
            console.log('📦 Barcode detected:', code);
            debouncedDetection(code);
          }
        });

      } catch (err) {
        console.error('Scanner setup error:', err);
        setError('Impossible d\'accès à la caméra. Vérifiez les permissions.');
      }
    };

    initQuagga();

    return () => {
      // Cleanup
      if (isInitialized && quagga) {
        quagga.stop();
        quagga.offDetected();
      }
    };
  }, [isInitialized, debouncedDetection, quagga]);

  const startScanner = () => {
    if (isInitialized && quagga && !isScanning) {
      quagga.start();
      setIsScanning(true);
      setError(null);
    }
  };

  const stopScanner = () => {
    if (isInitialized && quagga && isScanning) {
      quagga.stop();
      setIsScanning(false);
    }
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      // Reload the component to reinitialize Quagga
      window.location.reload();
    } catch {
      setError('Permission caméra refusée. Veuillez autoriser l\'accès à la caméra.');
    }
  };

  return (
    <div className="scanner-container">
      {/* Scanner Preview */}
      <div className="scanner-preview border-2 border-blue-500 rounded-lg overflow-hidden relative">
        <div 
          ref={videoRef} 
          className="w-full h-64 bg-black flex items-center justify-center"
        >
          {!quagga && !error && (
            <div className="text-white text-center">
              <div className="text-4xl mb-2">📦</div>
              <p>Chargement du scanner...</p>
            </div>
          )}
          {!isInitialized && quagga && !error && (
            <div className="text-white text-center">
              <div className="text-4xl mb-2">📷</div>
              <p>Initialisation du scanner...</p>
            </div>
          )}
        </div>
        
        {/* Scanner Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-32 border-2 border-green-500 rounded-lg relative">
            <div className="absolute -top-8 left-0 right-0 text-center text-green-500 text-sm">
              Alignez le code-barres ici
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
          {error.includes('Permission') && (
            <button
              onClick={requestCameraPermission}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Autoriser la caméra
            </button>
          )}
        </div>
      )}

      {/* Scanner Controls */}
      <div className="scanner-controls mt-4 flex space-x-4 justify-center">
        {quagga && isInitialized && (
          <>
            {!isScanning ? (
              <button
                onClick={startScanner}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ▶️ Démarrer le scan
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                ⏹️ Arrêter le scan
              </button>
            )}
          </>
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

      {/* Scanner Status */}
      <div className="scanner-status mt-4 text-center">
        <p className="text-sm text-gray-600">
          {!quagga ? (
            <span className="text-gray-500">⏳ Chargement du scanner...</span>
          ) : isScanning ? (
            <span className="text-green-600">🔍 Scan en cours...</span>
          ) : isInitialized ? (
            <span className="text-yellow-600">⏸️ Scanner en pause</span>
          ) : (
            <span className="text-gray-500">📱 Prêt à scanner</span>
          )}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supporte: EAN-13, EAN-8, UPC, Code 128
        </p>
      </div>
    </div>
  );
}