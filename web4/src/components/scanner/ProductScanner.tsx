// web4/src/components/scanner/ProductScanner.tsx
'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the barcode scanner (reduces initial bundle size)
const BarcodeScanner = dynamic(() => import('./BarcodeScanner'), {
  ssr: false,
  loading: () => <div>Chargement du scanner...</div>
});

interface ProductScannerProps {
  onScanSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function ProductScanner({ onScanSubmit, isLoading }: ProductScannerProps) {
  const [scanStep, setScanStep] = useState<'scan' | 'form'>('scan');
  const [barcode, setBarcode] = useState('');
  const [productInfo, setProductInfo] = useState<any>(null);

  const handleBarcodeDetected = useCallback(async (code: string) => {
    setBarcode(code);
    
    try {
      // Fetch product info from scanner server
      const response = await fetch(`${process.env.NEXT_PUBLIC_SCANNER_API}/api/products/${code}`);
      const result = await response.json();
      
      if (result.success) {
        setProductInfo(result.data);
      } else {
        // New product
        setProductInfo({ barcode: code });
      }
      
      setScanStep('form');
    } catch (error) {
      console.error('Error fetching product info:', error);
      setProductInfo({ barcode: code });
      setScanStep('form');
    }
  }, []);

  const handleFormSubmit = (formData: any) => {
    onScanSubmit({
      ...formData,
      barcode,
      externalUserId: 'temp-user' // Replace with actual user ID from your auth system
    });
  };

  return (
    <div className="scanner-interface">
      {scanStep === 'scan' && (
        <div>
          <BarcodeScanner onBarcodeDetected={handleBarcodeDetected} />
          <button 
            onClick={() => setScanStep('form')}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Saisir Manuellement
          </button>
        </div>
      )}
      
      {scanStep === 'form' && (
        <ProductForm 
          barcode={barcode}
          productInfo={productInfo}
          onSubmit={handleFormSubmit}
          onBack={() => setScanStep('scan')}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}