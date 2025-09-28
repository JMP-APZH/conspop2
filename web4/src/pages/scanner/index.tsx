// web4/src/pages/scanner/index.tsx
'use client';

import { useState } from 'react';
import ProductScanner from '../../components/scanner/ProductScanner';

const SCANNER_API = process.env.NEXT_PUBLIC_SCANNER_API || 'http://localhost:3001';

export default function ScannerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastScan, setLastScan] = useState(null);

  const handleScanSubmit = async (scanData: any) => {
    setIsLoading(true);
    try {
      // For file upload, we need FormData
      const formData = new FormData();
      
      // Append all fields
      Object.keys(scanData).forEach(key => {
        if (key === 'image' && scanData.image) {
          formData.append('image', scanData.image);
        } else {
          formData.append(key, scanData[key]);
        }
      });

      const response = await fetch(`${SCANNER_API}/api/scan`, {
        method: 'POST',
        body: formData, // No Content-Type header for FormData
      });
      
      const result = await response.json();
      
      if (result.success) {
        setLastScan(result.data);
        alert('Scan enregistré avec succès!');
      } else {
        alert(`Erreur: ${result.error}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Erreur réseau lors de l\'envoi du scan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scanner des Produits</h1>
      <p className="text-gray-600 mb-6">
        Scannez les codes-barres des produits pour contribuer à la base de données des prix en Martinique
      </p>
      
      <ProductScanner 
        onScanSubmit={handleScanSubmit}
        isLoading={isLoading}
      />
      
      {lastScan && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold">Dernier scan enregistré:</h3>
          <p>Produit: {lastScan.product?.name || 'Nouveau produit'}</p>
          <p>Prix: {lastScan.price}€</p>
          <p>Magasin: {lastScan.shopName}</p>
        </div>
      )}
    </div>
  );
}