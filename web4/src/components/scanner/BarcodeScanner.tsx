// web4/src/components/scanner/BarcodeScanner.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { BarcodeScannerProps } from './types';

// Export the interface so it can be imported elsewhere
// export interface BarcodeScannerProps {
//   onBarcodeDetected: (code: string) => void;
// }

// Simple barcode detection using HTML5 camera
export default function BarcodeScanner({ onBarcodeDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const streamRef = useRef<MediaStream | null>(null);

  // Request camera permission and start stream
  const requestCameraPermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      streamRef.current = stream;
      setCameraPermission('granted');
      setError(null);
      
      // Start the video immediately when permission is granted
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Wait for video to be ready
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().then(resolve).catch(resolve);
            };
          }
        });
      }
      
      return true;
    } catch (err: unknown) {
      console.error('Camera permission error:', err);
      
      let errorMessage = 'Impossible d\'accéder à la caméra. ';
      
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          errorMessage += 'Permission refusée. Veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur.';
        } else if (err.name === 'NotFoundError') {
          errorMessage += 'Aucune caméra n\'a été trouvée.';
        } else if (err.name === 'NotSupportedError') {
          errorMessage += 'Votre navigateur ne supporte pas l\'accès à la caméra.';
        } else {
          errorMessage += 'Erreur inconnue.';
        }
      } else {
        errorMessage += 'Erreur inconnue.';
      }
      
      setError(errorMessage);
      setCameraPermission('denied');
      return false;
    }
  };

  // Start camera
  const startScanner = async () => {
    setIsScanning(true);
    setError(null);
    
    if (cameraPermission !== 'granted') {
      const granted = await requestCameraPermission();
      if (!granted) {
        setIsScanning(false);
        return;
      }
    } else {
      // If permission was already granted, make sure video is playing
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current;
        try {
          await videoRef.current.play();
        } catch {
          console.error('Error playing video');
          setError('Erreur lors du démarrage de la caméra');
        }
      } else {
        // If we have permission but no stream, request it again
        const granted = await requestCameraPermission();
        if (!granted) {
          setIsScanning(false);
          return;
        }
      }
    }
  };

  // Stop camera
  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
    }
    
    setIsScanning(false);
  };

  // Initialize camera when component mounts if permission is already granted
  useEffect(() => {
    // Check if we already have camera permission
    const checkCameraPermission = async () => {
      try {
        const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
        if (permissions.state === 'granted') {
          setCameraPermission('granted');
          // Don't start automatically, wait for user to click start
        } else if (permissions.state === 'denied') {
          setCameraPermission('denied');
        }
      } catch {
        console.log('Permission query not supported');
      }
    };

    checkCameraPermission();
  }, []);

  // Capture image for manual barcode entry (user takes photo of barcode)
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError('La caméra n\'est pas prête');
      return;
    }

    const context = canvasRef.current.getContext('2d');
    if (!context) {
      setError('Impossible de capturer l\'image');
      return;
    }

    // Make sure video is ready
    if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
      setError('La caméra n\'est pas encore prête. Attendez quelques secondes.');
      return;
    }

    // Draw current video frame to canvas
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    console.log('Image captured, ready for manual barcode entry');

    // For now, we'll use manual entry since barcode detection is complex
    // In a real implementation, you could send this image to a barcode API
    alert('Image capturée! Maintenant, entrez manuellement le code-barres dans le formulaire.');
    
    // Stop camera after capture
    stopScanner();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
        {cameraPermission === 'granted' && isScanning ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-black flex items-center justify-center">
            {cameraPermission !== 'granted' ? (
              <div className="text-white text-center p-4">
                <div className="text-4xl mb-2">📷</div>
                <p className="text-sm">Autorisez l&apos;accès à la caméra pour scanner</p>
              </div>
            ) : (
              <div className="text-white text-center">
                <div className="text-4xl mb-2">📦</div>
                <p>Prêt à scanner</p>
              </div>
            )}
          </div>
        )}
        
        {/* Scanner Overlay */}
        {cameraPermission === 'granted' && isScanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-32 border-2 border-green-500 rounded-lg relative">
              <div className="absolute -top-8 left-0 right-0 text-center text-green-500 text-sm">
                Alignez le code-barres ici
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas for image capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
          <div className="mt-3 flex space-x-2">
            {error.includes('Permission') && (
              <>
                <button
                  onClick={requestCameraPermission}
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
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                ▶️ Démarrer la caméra
              </button>
            ) : (
              <>
                <button
                  onClick={captureImage}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📸 Capturer et saisir
                </button>
                <button
                  onClick={stopScanner}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  ⏹️ Arrêter
                </button>
              </>
            )}
          </>
        )}
        
        {cameraPermission !== 'granted' && cameraPermission !== 'denied' && (
          <button
            onClick={startScanner}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            📷 Autoriser la caméra
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
        <h4 className="font-semibold text-yellow-800 mb-2">Comment scanner:</h4>
        <ol className="text-yellow-700 text-sm list-decimal list-inside space-y-1">
          <li>Autorisez l&apos;accès à la caméra</li>
          <li>Démarrez la caméra</li>
          <li>Placez le code-barres dans le cadre vert</li>
          <li>Cliquez sur &quot;Capturer et saisir&quot;</li>
          <li>Entrez manuellement le code-barres dans le formulaire</li>
        </ol>
        <p className="text-yellow-600 text-xs mt-2">
          💡 Utilisez les boutons de test pour essayer sans caméra
        </p>
      </div>

      {/* Scanner Status */}
      <div className="scanner-status mt-4 text-center">
        <p className="text-sm text-gray-600">
          {cameraPermission === 'denied' ? (
            <span className="text-red-600">❌ Accès caméra refusé</span>
          ) : cameraPermission !== 'granted' ? (
            <span className="text-orange-600">📷 Autorisation caméra requise</span>
          ) : isScanning ? (
            <span className="text-green-600">🔍 Caméra active - Prêt à capturer</span>
          ) : (
            <span className="text-gray-500">📱 Prêt à scanner</span>
          )}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Prenez une photo du code-barres et saisissez-le manuellement
        </p>
      </div>
    </div>
  );
}