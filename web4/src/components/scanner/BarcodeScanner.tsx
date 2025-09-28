// web4/src/components/scanner/BarcodeScanner.tsx
'use client';

import { useEffect, useRef } from 'react';

interface BarcodeScannerProps {
  onBarcodeDetected: (code: string) => void;
}

export default function BarcodeScanner({ onBarcodeDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // For now, we'll create a mock scanner since implementing a real barcode scanner
    // requires additional libraries. This will allow you to test the form flow.
    
    const initMockScanner = () => {
      console.log('📷 Mock scanner initialized - real scanner will be implemented later');
      
      // Simulate camera access
      if (videoRef.current) {
        videoRef.current.style.background = '#000';
        videoRef.current.innerHTML = `
          <div style="color: white; text-align: center; padding: 50px;">
            <div style="font-size: 48px; margin-bottom: 20px;">📷</div>
            <h3>Scanner de codes-barres</h3>
            <p>Placez le code-barres dans le cadre</p>
            <button onclick="window.dispatchEvent(new CustomEvent('mockScan', { detail: '1234567890123' }))" 
                    style="margin-top: 20px; padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Simuler un scan (EAN-13)
            </button>
            <button onclick="window.dispatchEvent(new CustomEvent('mockScan', { detail: '12345678' }))" 
                    style="margin-top: 10px; padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
              Simuler un scan (EAN-8)
            </button>
          </div>
        `;
      }
    };

    // Handle mock scan events
    const handleMockScan = (event: CustomEvent) => {
      onBarcodeDetected(event.detail);
    };

    // Add event listener for mock scans
    window.addEventListener('mockScan', handleMockScan as EventListener);
    initMockScanner();

    return () => {
      window.removeEventListener('mockScan', handleMockScan as EventListener);
    };
  }, [onBarcodeDetected]);

  return (
    <div className="scanner-container">
      <div className="scanner-preview border-2 border-blue-500 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="scanner-instructions mt-4 text-center text-gray-600">
        <p>📱 Utilisez le bouton pour simuler un scan pendant le développement</p>
        <p className="text-sm">(Le vrai scanner sera implémenté avec la librairie Quagga)</p>
      </div>
    </div>
  );
}