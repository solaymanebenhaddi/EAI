const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const filesToOptimize = [
  'public/assets/backgound_hero.png',
  'public/textures/concrete.png',
  'public/textures/streets.png',
  'public/textures/windows.png'
];

async function optimizeImages() {
  for (const file of filesToOptimize) {
    const inputPath = path.join(__dirname, file);
    const outputPath = inputPath.replace('.png', '.webp');
    
    if (fs.existsSync(inputPath)) {
      console.log(`Optimizing ${file}...`);
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      
      const inStat = fs.statSync(inputPath);
      const outStat = fs.statSync(outputPath);
      console.log(`Saved ${(inStat.size - outStat.size) / 1024} KB for ${file}`);
      
      // Remove the original PNG
      try {
        fs.unlinkSync(inputPath);
      } catch (e) {
        console.log(`Could not delete ${inputPath}: ${e.message}`);
      }
    } else {
      console.log(`File not found: ${file}`);
    }
  }
}

optimizeImages().then(() => console.log('Optimization complete.')).catch(console.error);
