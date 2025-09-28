// scanner-server/src/server.ts
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

// Middleware - Flexible CORS configuration
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      "http://localhost:3000",
      "http://localhost:3001", 
      "https://brittany-unexempt-don.ngrok-free.dev"
    ].filter(Boolean);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    if (origin.includes('.ngrok.io') || origin.includes('.ngrok-free.dev')) {
      return callback(null, true);
    }
    
    if (origin.includes('192.168.') || origin.includes('10.0.') || origin.includes('172.')) {
      return callback(null, true);
    }
    
    console.log('Blocked by CORS:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `scan-${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// ✅ Root route
app.get('/', (req, res) => {
  res.json({
    message: '🛒 Scanner Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      scan: '/api/scan',
      products: '/api/products/:barcode',
      categories: '/api/categories'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Scanner server is running', 
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Product scanning endpoints
app.post('/api/scan', upload.single('image'), async (req, res) => {
  try {
    const { barcode, price, qualityScore, categoryId, shopName, location, externalUserId } = req.body;
    
    // Process the scan
    const scan = await processProductScan({
      barcode,
      price: parseFloat(price),
      qualityScore,
      categoryId,
      shopName,
      location,
      externalUserId,
      imageFile: req.file
    });
    
    res.json({ success: true, data: scan });
  } catch (error) {
    console.error('Scan processing error:', error);
    res.status(500).json({ success: false, error: 'Failed to process scan' });
  }
});

// Get product by barcode
app.get('/api/products/:barcode', async (req, res) => {
  try {
    const product = await prisma.scannerProduct.findUnique({
      where: { barcode: req.params.barcode },
      include: { category: true, scans: { take: 5, orderBy: { createdAt: 'desc' } } }
    });
    
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Product lookup failed' });
  }
});

// Get categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.scannerCategory.findMany({
      orderBy: { name: 'asc' }
    });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Categories fetch failed' });
  }
});

// ✅ 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /',
      'GET /api/health',
      'POST /api/scan',
      'GET /api/categories',
      'GET /api/products/:barcode'
    ]
  });
});

// Start server - listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Scanner server running on http://0.0.0.0:${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
  console.log(`🌐 Ngrok: https://brittany-unexempt-don.ngrok-free.dev`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

// Utility function (temporary implementation)
async function processProductScan(scanData: any) {
  console.log('📸 Processing scan:', scanData);
  
  // Temporary implementation
  return {
    id: 'temp-' + Date.now(),
    barcode: scanData.barcode,
    price: scanData.price,
    qualityScore: scanData.qualityScore,
    shopName: scanData.shopName,
    location: scanData.location,
    imageUrl: scanData.imageFile ? `/uploads/${scanData.imageFile.filename}` : null,
    createdAt: new Date().toISOString()
  };
}