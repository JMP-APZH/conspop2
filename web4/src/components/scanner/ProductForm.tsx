// web4/src/components/scanner/ProductForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { FormData, ProductInfo } from '../../types/scanner';

const CATEGORIES = [
  { id: '1', name: 'Viande', description: 'Viandes et volailles' },
  { id: '2', name: 'Poisson/Produits de la mer', description: 'Poissons et fruits de mer' },
  { id: '3', name: 'Fruits et Légumes', description: 'Fruits et légumes frais' },
  { id: '4', name: 'Produits Laitiers', description: 'Lait, fromage, yaourts' },
  { id: '5', name: 'Céréales et Farines', description: 'Riz, pâtes, farines' },
  { id: '6', name: 'Boissons', description: 'Eau, jus, sodas' },
  { id: '7', name: 'Épicerie Salée', description: 'Conserves, condiments' },
  { id: '8', name: 'Épicerie Sucrée', description: 'Sucre, chocolat, biscuits' },
  { id: '9', name: 'Hygiène', description: 'Produits d\'hygiène personnelle' },
  { id: '10', name: 'Entretien', description: 'Produits ménagers' },
];

const QUALITY_SCORES = [
  { value: 'A', label: 'A - Excellente qualité nutritionnelle', color: 'green' },
  { value: 'B', label: 'B - Bonne qualité', color: 'light-green' },
  { value: 'C', label: 'C - Qualité moyenne', color: 'yellow' },
  { value: 'D', label: 'D - Mauvaise qualité', color: 'orange' },
  { value: 'E', label: 'E - Qualité très mauvaise', color: 'red' },
];

const ESSENTIALITY_OPTIONS = [
  { value: 'ESSENTIAL', label: '🛒 Essentiel - Produit de première nécessité' },
  { value: 'ACCESSORY', label: '🎁 Accessoire - Produit non essentiel' }
];

interface ProductFormProps {
  barcode: string;
  productInfo: ProductInfo | null;
  onSubmit: (formData: FormData) => void;
  onBack: () => void;
  isLoading: boolean;
}

export default function ProductForm({ barcode, productInfo, onSubmit, onBack, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>({
    price: '',
    qualityScore: '',
    categoryId: '',
    shopName: '',
    location: '',
    essentiality: '',
    isBQP: false,
    // image: null as File | null,
    image: null,
  });

  // Auto-fill from product data if available
  useEffect(() => {
    if (productInfo) {
      setFormData(prev => ({
        ...prev,
        categoryId: productInfo.category?.id || '',
        qualityScore: '', // Don't auto-fill quality score as it's user input
    }));
    }
  }, [productInfo]);

  const handleLocationDetection = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Simple reverse geocoding - you might want to use a proper geocoding service
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=fr`);
            const locationData = await response.json();
            setFormData(prev => ({ 
              ...prev, 
              location: locationData.locality || locationData.city || 'Localisation détectée' 
            }));
          } catch (error) {
            console.error('Geocoding error:', error);
            setFormData(prev => ({ 
              ...prev, 
              location: `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}` 
            }));
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Impossible d\'accéder à votre localisation');
        }
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.price || !formData.qualityScore || !formData.categoryId || !formData.shopName || !formData.location || !formData.essentiality) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold">Produit scanné</h3>
        <p className="text-sm text-gray-600">
          Code-barres: <strong>{barcode}</strong>
        </p>
        {productInfo?.name && (
          <p className="text-sm text-gray-600">
            Nom: <strong>{productInfo.name}</strong>
          </p>
        )}
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prix (€) *
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          required
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0.00"
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Score de qualité *
        </label>
        <select
          required
          value={formData.qualityScore}
          onChange={(e) => setFormData(prev => ({ ...prev, qualityScore: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionner un score</option>
          {QUALITY_SCORES.map(score => (
            <option key={score.value} value={score.value}>
              {score.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Classification du produit *
        </label>
        <select
          required
          value={formData.essentiality}
          onChange={(e) => setFormData(prev => ({ ...prev, essentiality: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionner</option>
          {ESSENTIALITY_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isBQP}
            onChange={(e) => setFormData(prev => ({ ...prev, isBQP: e.target.checked }))}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            ✅ Fait partie du Bouclier Qualité Prix (BQP) 2024
          </span>
        </label>
        <small className="text-xs text-gray-500 block mt-1">
          Produit inclus dans le dispositif BQP de la Préfecture de Martinique
        </small>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Catégorie *
        </label>
        <select
          required
          value={formData.categoryId}
          onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sélectionner une catégorie</option>
          {CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Magasin *
        </label>
        <input
          type="text"
          required
          value={formData.shopName}
          onChange={(e) => setFormData(prev => ({ ...prev, shopName: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Carrefour, SuperU, marché local..."
        />
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Localisation du magasin *
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Adresse ou quartier"
          />
          <button 
            type="button" 
            onClick={handleLocationDetection}
            className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            📍
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Photo du produit (optionnel)
        </label>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <small className="text-xs text-gray-500">
          Prenez une photo du produit avec le prix visible
        </small>
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
        >
          Retour
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Enregistrement...' : 'Enregistrer le scan'}
        </button>
      </div>
    </form>
  );
}