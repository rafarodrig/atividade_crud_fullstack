import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, cb) => {
    const filename = `${crypto.randomBytes(8).toString('hex')}-${file.originalname}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage });