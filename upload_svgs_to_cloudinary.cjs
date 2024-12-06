require('dotenv').config();
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name from .env
  api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key from .env
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret from .env
});


const svgDir = path.join(__dirname, 'public', 'assets' ,'shop4');

// Function to validate image file (SVG only)
function isValidImageFile(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    if (ext !== '.svg') {
      return false;
    }
    const content = fs.readFileSync(filePath);
    if (!content || content.length === 0) {
      return false;
    }
    const strContent = content.toString('utf8').trim();
    // Basic SVG validation - check if it starts with <svg
    return strContent.startsWith('<svg') || strContent.includes('<svg');
  } catch (error) {
    return false;
  }
}

// Recursively find all .svg files in a directory
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else if (filePath.endsWith('.svg')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

async function uploadAllImages() {
  const imageFiles = getAllImageFiles(svgDir);
  if (imageFiles.length === 0) {
    console.log('No SVG or PNG files found in', svgDir);
    return;
  }
  
  console.log(`Found ${imageFiles.length} SVG/PNG files. Starting validation and upload...`);
  
  for (const file of imageFiles) {
    try {
      // Validate image file before upload
      if (!isValidImageFile(file)) {
        console.warn(`⚠️  Skipping invalid/empty image file: ${file}`);
        continue;
      }
      
      const relativePath = path.relative(__dirname, file).replace(/\\/g, '/'); // for Windows compatibility
      const publicId = relativePath.replace(/\//g, '_').replace(/src_assets_/, '').replace(/\.(svg|png)$/, ''); // flatten but unique
      const ext = path.extname(file).toLowerCase();

      const result = await cloudinary.uploader.upload(file, {
        resource_type: 'image',
        folder: 'public_assets_shop4',
        public_id: publicId, // already removed extension
        overwrite: false,
      });
      console.log(`✅ Uploaded: ${file} -> ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err.message);
    }
  }
}

uploadAllImages(); 