const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createSocialMediaImages() {
  const inputImage = path.join(__dirname, '../public/anubhav-email-ai.jpeg');
  const publicDir = path.join(__dirname, '../public');

  console.log('🎨 Creating optimized social media images...');

  try {
    // Facebook/LinkedIn Open Graph (1200x630 - recommended)
    await sharp(inputImage)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(publicDir, 'og-image-facebook.png'));
    
    console.log('✅ Generated og-image-facebook.png (1200x630)');

    // Twitter Card (1200x600 - recommended)
    await sharp(inputImage)
      .resize(1200, 600, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(publicDir, 'og-image-twitter.png'));
    
    console.log('✅ Generated og-image-twitter.png (1200x600)');

    // WhatsApp/Instagram (1080x1080 - square)
    await sharp(inputImage)
      .resize(1080, 1080, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(publicDir, 'og-image-square.png'));
    
    console.log('✅ Generated og-image-square.png (1080x1080)');

    // Teams/Discord (1200x675 - 16:9 aspect ratio)
    await sharp(inputImage)
      .resize(1200, 675, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(publicDir, 'og-image-wide.png'));
    
    console.log('✅ Generated og-image-wide.png (1200x675)');

    // Keep the original square version as fallback
    await sharp(inputImage)
      .resize(1200, 1200, {
        fit: 'cover',
        position: 'center'
      })
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    
    console.log('✅ Updated og-image.png (1200x1200)');

    console.log('\n🎉 All social media images generated successfully!');
    console.log('\n📱 Platform-specific images:');
    console.log('• Facebook/LinkedIn: og-image-facebook.png (1200x630)');
    console.log('• Twitter/X: og-image-twitter.png (1200x600)');
    console.log('• WhatsApp/Instagram: og-image-square.png (1080x1080)');
    console.log('• Teams/Discord: og-image-wide.png (1200x675)');
    console.log('• Fallback: og-image.png (1200x1200)');
    
  } catch (error) {
    console.error('Error generating social media images:', error);
  }
}

createSocialMediaImages();