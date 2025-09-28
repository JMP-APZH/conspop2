import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the form data
    const form = formidable({
      uploadDir: './public/uploads',
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
      // filename: (name, ext) => {
      //   return `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
      // },
    });

    // const [files] = await form.parse(req);

    // Fix: Use proper type for fields and files
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ error: 'File upload failed' });
      }

      // Fix: Handle the file properly with type checking
      const file = files.file as formidable.File[] | undefined;
      
      if (!file || file.length === 0) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const uploadedFile = file[0];
      
      // Fix: Use 'filepath' instead of 'path' and handle the type properly
      const filePath = uploadedFile.filepath;
      const fileName = uploadedFile.originalFilename || 'uploaded-file';
      
      // Remove the unused variables
      // const fields = fields; // This line was causing the unused variable error

    res.status(200).json({
        success: true,
        filePath: filePath,
        fileName: fileName,
        message: 'File uploaded successfully'
      });
    });

  } catch (error) {
    console.error('Upload handler error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}