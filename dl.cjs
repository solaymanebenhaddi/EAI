const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const imgs = {
  'elaouad-hero-villa.webp': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85',
  'elaouad-plans-bim-interior.webp': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
  'elaouad-before-shell.webp': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
  'elaouad-after-interior.webp': 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  'elaouad-events-formation.webp': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'
};

async function go() {
  for (const [f, u] of Object.entries(imgs)) {
    console.log('Downloading', f);
    try {
      const r = await fetch(u);
      if (!r.ok) throw new Error(r.status);
      fs.writeFileSync(path.join(dir, f), Buffer.from(await r.arrayBuffer()));
      console.log('OK', f);
    } catch (e) { console.error('FAIL', f, e); }
  }
}
go();
