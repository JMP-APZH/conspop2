// // web4/src/components/scanner/BarcodeScanner.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { BarcodeScannerProps } from './types';

// // Define minimal types based on the library's actual API
// interface ScanResult {
//   getText: () => string;
// }

// interface ScannerProps {
//   onUpdate: (error: unknown, result?: ScanResult) => void;
//   constraints?: {
//     audio: boolean;
//     video: {
//       facingMode: string;
//       width?: { ideal: number };
//       height?: { ideal: number };
//     };
//   };
// }

// // Dynamically import the scanner to avoid SSR issues
// const BarcodeScannerComponent = ({ onBarcodeDetected }: BarcodeScannerProps) => {
//   const [isScanning, setIsScanning] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [cameraPermission, setCameraPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
//   const [Scanner, setScanner] = useState<React.ComponentType<ScannerProps> | null>(null);

//   // DEBUG: Dynamically load the scanner component with logging
//   useEffect(() => {
//     const loadScanner = async () => {
//       try {
//         const scannerModule = await import('react-qr-barcode-scanner');
//         console.log('Scanner module exports:', Object.keys(scannerModule));
//         console.log('Scanner module:', scannerModule);
        
//         // Try to use whatever export is available - use unknown first then cast
//         if (scannerModule.default) {
//           console.log('Using default export');
//           setScanner(() => scannerModule.default as unknown as React.ComponentType<ScannerProps>);
//         } else {
//           // Use the first export
//           const firstExport = Object.keys(scannerModule)[0];
//           if (firstExport) {
//             console.log('Using first export:', firstExport);
//             setScanner(() => scannerModule[firstExport as keyof typeof scannerModule] as unknown as React.ComponentType<ScannerProps>);
//           } else {
//             throw new Error('No scanner component found in module');
//           }
//         }
//       } catch (err) {
//         console.error('Failed to load scanner:', err);
//         setError('Impossible de charger le scanner');
//       }
//     };

//     loadScanner();
//   }, []);

//   const startScanner = () => {
//     setIsScanning(true);
//     setError(null);
//   };

//   const stopScanner = () => {
//     setIsScanning(false);
//   };

//   const handleScannerUpdate = (error: unknown, result?: ScanResult) => {
//     if (error) {
//       console.error('Scanner error:', error);
//       if (error instanceof Error) {
//         if (error.name === 'NotAllowedError') {
//           setCameraPermission('denied');
//           setError('Permission caméra refusée');
//         } else if (error.name === 'NotFoundError') {
//           setError('Aucune caméra disponible');
//         } else {
//           setError('Erreur du scanner: ' + error.message);
//         }
//       } else {
//         setError('Erreur inconnue du scanner');
//       }
//       return;
//     }

//     if (result) {
//       try {
//         const text = result.getText();
//         console.log('Barcode detected:', text);
//         onBarcodeDetected(text);
//         stopScanner();
//       } catch (err) {
//         console.error('Error getting text from result:', err);
//       }
//     }
//   };

//   // Check initial camera permission
//   useEffect(() => {
//     const checkCameraPermission = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         stream.getTracks().forEach(track => track.stop());
//         setCameraPermission('granted');
//       } catch (err) {
//         if (err instanceof Error && err.name === 'NotAllowedError') {
//           setCameraPermission('denied');
//         }
//       }
//     };

//     checkCameraPermission();
//   }, []);

//   const openCameraSettings = () => {
//     setError(
//       'Pour autoriser la caméra:\n\n' +
//       '1. Cliquez sur l\'icône 🔒 à gauche de l\'URL\n' +
//       '2. Sélectionnez "Autoriser l\'accès à la caméra"\n' +
//       '3. Rechargez la page\n\n' +
//       'Ou essayez un autre navigateur comme Chrome.'
//     );
//   };

//   return (
//     <div className="scanner-container">
//       {/* Permission Request */}
//       {cameraPermission === 'prompt' && (
//         <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
//           <div className="text-4xl mb-2">📷</div>
//           <h3 className="font-semibold text-blue-800 mb-2">Accès à la caméra requis</h3>
//           <p className="text-blue-700 text-sm mb-4">
//             Pour scanner les codes-barres, l&apos;application a besoin d&apos;accéder à votre caméra.
//           </p>
//           <button
//             onClick={startScanner}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//           >
//             Autoriser la caméra et démarrer
//           </button>
//         </div>
//       )}

//       {/* Scanner Preview */}
//       <div className="scanner-preview border-2 border-blue-500 rounded-lg overflow-hidden relative">
//         {isScanning && Scanner ? (
//           <div className="w-full h-64">
//             <Scanner
//               onUpdate={handleScannerUpdate}
//               constraints={{
//                 audio: false,
//                 video: {
//                   facingMode: 'environment',
//                   width: { ideal: 1280 },
//                   height: { ideal: 720 }
//                 }
//               }}
//             />
//           </div>
//         ) : (
//           <div className="w-full h-64 bg-black flex items-center justify-center">
//             <div className="text-white text-center p-4">
//               {cameraPermission !== 'granted' ? (
//                 <>
//                   <div className="text-4xl mb-2">📷</div>
//                   <p className="text-sm">Autorisez l&apos;accès à la caméra pour scanner</p>
//                 </>
//               ) : (
//                 <>
//                   <div className="text-4xl mb-2">📦</div>
//                   <p>Prêt à scanner</p>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
        
//         {/* Scanner Overlay */}
//         {isScanning && (
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//             <div className="w-64 h-32 border-2 border-green-500 rounded-lg relative">
//               <div className="absolute -top-8 left-0 right-0 text-center text-green-500 text-sm">
//                 Alignez le code-barres ici
//               </div>
//               <div className="absolute -bottom-8 left-0 right-0 text-center text-green-500 text-xs">
//                 Détection automatique
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//           <p className="text-red-700 text-sm whitespace-pre-line">{error}</p>
//           <div className="mt-3 flex space-x-2">
//             {error.includes('Permission') && (
//               <>
//                 <button
//                   onClick={startScanner}
//                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
//                 >
//                   Réessayer
//                 </button>
//                 <button
//                   onClick={openCameraSettings}
//                   className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
//                 >
//                   Instructions
//                 </button>
//               </>
//             )}
//             <button
//               onClick={() => window.location.reload()}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
//             >
//               Recharger la page
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Scanner Controls */}
//       <div className="scanner-controls mt-4 flex flex-wrap gap-2 justify-center">
//         {cameraPermission === 'granted' && (
//           <>
//             {!isScanning ? (
//               <button
//                 onClick={startScanner}
//                 className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 ▶️ Démarrer le scanner
//               </button>
//             ) : (
//               <button
//                 onClick={stopScanner}
//                 className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 ⏹️ Arrêter
//               </button>
//             )}
//           </>
//         )}
        
//         {cameraPermission !== 'granted' && cameraPermission !== 'denied' && (
//           <button
//             onClick={startScanner}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             📷 Autoriser la caméra
//           </button>
//         )}
        
//         {/* Fallback manual buttons */}
//         <button 
//           onClick={() => onBarcodeDetected('1234567890123')}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
//         >
//           📋 Test EAN-13
//         </button>
//         <button 
//           onClick={() => onBarcodeDetected('12345678')}
//           className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
//         >
//           📋 Test EAN-8
//         </button>
//       </div>

//       {/* Instructions */}
//       <div className="scanner-instructions mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//         <h4 className="font-semibold text-yellow-800 mb-2">Comment scanner:</h4>
//         <ol className="text-yellow-700 text-sm list-decimal list-inside space-y-1">
//           <li>Autorisez l&apos;accès à la caméra</li>
//           <li>Démarrez le scanner</li>
//           <li>Placez le code-barres dans le cadre vert</li>
//           <li>Le code-barres sera détecté automatiquement</li>
//           <li>Remplissez les informations du produit</li>
//         </ol>
//         <p className="text-yellow-600 text-xs mt-2">
//           💡 Utilisez les boutons de test pour essayer sans caméra
//         </p>
//       </div>

//       {/* Scanner Status */}
//       <div className="scanner-status mt-4 text-center">
//         <p className="text-sm text-gray-600">
//           {cameraPermission === 'denied' ? (
//             <span className="text-red-600">❌ Accès caméra refusé</span>
//           ) : cameraPermission !== 'granted' ? (
//             <span className="text-orange-600">📷 Autorisation caméra requise</span>
//           ) : isScanning ? (
//             <span className="text-green-600">🔍 Scanner actif - Détection automatique</span>
//           ) : (
//             <span className="text-gray-500">📱 Prêt à scanner</span>
//           )}
//         </p>
//         <p className="text-xs text-gray-500 mt-1">
//           Scanner de codes-barres compatible React
//         </p>
//       </div>
//     </div>
//   );
// };

// export default BarcodeScannerComponent;