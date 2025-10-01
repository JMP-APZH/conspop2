// web4/src/types/quagga.d.ts
declare module 'quagga' {
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

  interface QuaggaResult {
    codeResult: {
      code: string;
      format: string;
    };
  }

  interface QuaggaProcessedResult {
    boxes?: unknown[];
    codeResult?: {
      code: string;
      format: string;
    };
  }

  interface QuaggaStatic {
    init(config: QuaggaConfig, callback: (err: Error | null) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (result: QuaggaResult) => void): void;
    offDetected(callback?: (result: QuaggaResult) => void): void;
    onProcessed(callback: (result: QuaggaProcessedResult) => void): void;
    offProcessed(callback?: (result: QuaggaProcessedResult) => void): void;
  }

  const Quagga: QuaggaStatic;
  export default Quagga;
}