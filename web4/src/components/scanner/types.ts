export interface BarcodeScannerProps {
  onBarcodeDetected: (code: string) => void;
}