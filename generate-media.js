const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'public/assets/gallerie');
const files = fs.readdirSync(dirPath);

const mediaItems = files.map(file => {
  const ext = path.extname(file).toLowerCase();
  const type = (ext === '.mp4' || ext === '.webm') ? 'video' : 'image';
  return `  {
    "src": "/assets/gallerie/${file}",
    "type": "${type}"
  }`;
});

const fileContent = `export const galleryMedia = [
${mediaItems.join(',\n')}
] as const;
`;

fs.writeFileSync(path.join(__dirname, 'src/data/gallerieMedia.ts'), fileContent);
console.log('Successfully generated gallerieMedia.ts with ' + mediaItems.length + ' items');
