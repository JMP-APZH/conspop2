// web4/src/services/scanbotService.ts
import ScanbotSDK from 'scanbot-web-sdk';

interface Barcode {
  text: string;
}

interface BarcodeDetectionResult {
  barcodes: Barcode[];
}

export class ScanbotService {
  private sdk: unknown = null;
  private scanner: unknown = null;
  private isInitialized = false;

  async initialize(
    licenseKey: string = ''
  ): Promise<boolean> {
  if (this.isInitialized) return true;

  try {
    console.log('Initializing Scanbot SDK...');

    // Debug: Check if environment variable is available
    console.log('process.env.NEXT_PUBLIC_SCANBOT_LICENSE_KEY:', process.env.NEXT_PUBLIC_SCANBOT_LICENSE_KEY);
    console.log('typeof process.env:', typeof process.env);
    
    // Use the environment variable or passed parameter
    const actualLicenseKey = licenseKey || process.env.NEXT_PUBLIC_SCANBOT_LICENSE_KEY || '';

    console.log('License key to use:', actualLicenseKey);
    console.log('Actual license key length:', actualLicenseKey.length);
    console.log('License key first 20 chars:', actualLicenseKey.substring(0, 20) + '...');
    
    const config = {
      licenseKey: actualLicenseKey,
      enginePath: '/scanbot-sdk/bin/barcode-scanner/',
      onReady: () => {
        console.log('Scanbot SDK ready');
        this.isInitialized = true;
      },
      onError: (error: unknown) => {
        console.error('Scanbot SDK error:', error);
      }
    };

    console.log('Using license key:', actualLicenseKey ? 'SET' : 'NOT SET');
    
    this.sdk = await ScanbotSDK.initialize(config);
    return true;
  } catch (error) {
    console.error('Failed to initialize Scanbot SDK:', error);
    return false;
  }
}

  async createBarcodeScanner(containerId: string, onBarcodesDetected: (barcodes: Barcode[]) => void): Promise<void> {
    if (!this.sdk) {
      throw new Error('Scanbot SDK not initialized');
    }

    const sdk = this.sdk as {
      createBarcodeScanner: (config: unknown) => Promise<unknown>;
    };

    const configuration = {
      containerId: containerId,
      onBarcodesDetected: (result: BarcodeDetectionResult) => {
        console.log('Barcodes detected:', result.barcodes);
        onBarcodesDetected(result.barcodes);
      },
      onError: (error: unknown) => {
        console.error('Barcode scanner error:', error);
      },
      barcodeFormats: [
        'AZTEC',
        'CODABAR',
        'CODE_39',
        'CODE_93',
        'CODE_128',
        'DATA_MATRIX',
        'EAN_8',
        'EAN_13',
        'ITF',
        'MAXICODE',
        'PDF_417',
        'QR_CODE',
        'RSS_14',
        'RSS_EXPANDED',
        'UPC_A',
        'UPC_E',
        'UPC_EAN_EXTENSION',
        'MSI_PLESSEY'
      ],
      engineMode: 'NEXT_GEN',
      barcodeFilter: {
        minLength: 4,
        checkDigit: false
      }
    };

    this.scanner = await sdk.createBarcodeScanner(configuration);
  }

  async startScanner(): Promise<void> {
    if (this.scanner) {
      const scanner = this.scanner as { startScanning: () => Promise<void> };
      await scanner.startScanning();
    }
  }

  async stopScanner(): Promise<void> {
    if (this.scanner) {
      const scanner = this.scanner as { stopScanning: () => Promise<void> };
      await scanner.stopScanning();
    }
  }

  async disposeScanner(): Promise<void> {
    if (this.scanner) {
      const scanner = this.scanner as { dispose: () => Promise<void> };
      await scanner.dispose();
      this.scanner = null;
    }
  }

  async dispose(): Promise<void> {
    await this.disposeScanner();
    if (this.sdk) {
      const sdk = this.sdk as { dispose: () => Promise<void> };
      await sdk.dispose();
      this.sdk = null;
      this.isInitialized = false;
    }
  }

  getIsInitialized(): boolean {
    return this.isInitialized;
  }
}

export const scanbotService = new ScanbotService();