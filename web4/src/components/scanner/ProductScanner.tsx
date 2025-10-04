// web4/src/components/scanner/ProductScanner.tsx
'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ScanData, ProductInfo, FormData as FormDataType } from '../../types/scanner';
import ProductForm from './ProductForm';

// Dynamically import the Scanbot scanner
const ScanbotBarcodeScanner = dynamic(
  () => import('./ScanbotBarcodeScanner'),
  {
    ssr: false,
    loading: () => <div>Chargement du scanner professionnel...</div>
  }
);

interface ProductScannerProps {
  onScanSubmit: (data: ScanData) => void;
  isLoading: boolean;
}

export default function ProductScanner({ onScanSubmit, isLoading }: ProductScannerProps) {
  const [scanStep, setScanStep] = useState<'scan' | 'form'>('scan');
  const [barcode, setBarcode] = useState('');
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);

  const handleBarcodeDetected = useCallback((code: string) => {
    setBarcode(code);
    
    // Make the API call separately
    const fetchProductInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SCANNER_API}/api/products/${code}`);
        const result = await response.json();
        
        if (result.success) {
          setProductInfo(result.data);
        } else {
          setProductInfo({ barcode: code });
        }
      } catch (error) {
        console.error('Error fetching product info:', error);
        setProductInfo({ barcode: code });
      } finally {
        setScanStep('form');
      }
    };

    fetchProductInfo();
  }, []);

  const handleFormSubmit = (formData: FormDataType) => {
    const scanData: ScanData = {
      ...formData,
      barcode,
      externalUserId: 'temp-user'
    };
    onScanSubmit(scanData);
  };

  return (
    <div className="scanner-interface">
      {scanStep === 'scan' && (
        <div>
          <ScanbotBarcodeScanner onBarcodeDetected={handleBarcodeDetected} />
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