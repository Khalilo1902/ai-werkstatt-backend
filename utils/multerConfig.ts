// uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Nur Bilder erlaubt (JPEG, PNG, WebP)');
    error.name = "FileTypeError";
    cb(error, false);
  }
};


const uploadsImage = multer({  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }});

export default uploadsImage;
