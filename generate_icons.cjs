const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgPath = path.join(__dirname, 'public', 'favicon.svg');
const publicDir = path.join(__dirname, 'public');

async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    console.log('Generating pwa-192x192.png...');
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'pwa-192x192.png'));

    console.log('Generating pwa-512x512.png...');
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'pwa-512x512.png'));

    console.log('Generating apple-touch-icon.png...');
    // Apple touch icon needs a solid background usually, let's just make it the same for now
    await sharp(svgBuffer)
      .resize(180, 180)
      .flatten({ background: '#ffffff' })
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));

    console.log('Icons generated successfully.');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
