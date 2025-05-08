import multer from "multer";
import { NextFunction, Request, Response } from "express";

// Configure multer with proper file filter and error handling

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
      files: 60 // Total files limit
    },
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        cb(new Error('Only image files are allowed'));
        return;
      }
      cb(null, true);
    }
  });

// Create error handler middleware with proper types
export const handleMulterError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
       res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 5MB'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
       res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 24 files'
      });
    }
  }
  next(err);
};