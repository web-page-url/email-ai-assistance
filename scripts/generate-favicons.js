const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicons() {
  const inputImage = path.join(__dirname, '../public/anubhav-email-ai.jpeg');
  const publicDir = path.join(__dirname, '../public');

  // Check if input image exists
  if (!fs.existsSync(inputImage)) {
    console.error('Input image not found:', inputImage);
    return;
  }

  console.log('Generating favicons from:', inputImage);

  try {
    // Generate different sizes
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 48, name: 'favicon-48x48.png' },
      { size: 180, name: 'apple-touch-icon.png' },
      { size: 192, name: 'android-chrome-192x192.png' },
      { size: 512, name: 'android-chrome-512x512.png' },
      { size: 1200, name: 'og-image.png' } // For social media sharing
    ];

    for (const { size, name } of sizes) {
      await sharp(inputImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(path.join(publicDir, name));
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    }

    // Generate ICO file for older browsers
    await sharp(inputImage)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✓ Generated favicon.ico');

    console.log('🎉 All favicons generated successfully!');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();