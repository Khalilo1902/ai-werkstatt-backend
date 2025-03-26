import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response ,NextFunction} from "express";

export const processImage = async (req:Request, res:Response, next:NextFunction) => {
    if (!req.file) return next();
  
    try {
      const optimizedDir = path.join(__dirname, '../uploads/optimized');
      if (!fs.existsSync(optimizedDir)) {
        fs.mkdirSync(optimizedDir, { recursive: true });
      }
  
      const ext = path.extname(req.file.originalname).toLowerCase();
      const newFilename = `blog-${Date.now()}${ext}`;
      const outputPath = path.join(optimizedDir, newFilename);
  
      // Process image (convert to WebP if not already)
      if (ext === '.webp') {
        await fs.promises.rename(req.file.path, outputPath);
      } else {
        await sharp(req.file.path)
          .resize(800)
          .webp({ quality: 80 })
          .toFile(outputPath);
        fs.unlinkSync(req.file.path);
      }
  
      // Store only the web-accessible path
      req.file.path = `/uploads/optimized/${newFilename}`;
      next();
    } catch (error) {
      console.error('Image processing error:', error);
      if (req.file?.path) fs.unlinkSync(req.file.path);
      res.status(500).json({ message: 'Image processing failed' });
    }
  };
