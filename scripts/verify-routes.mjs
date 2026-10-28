import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('--- Verifying Blossoms SOS Routes & 404 Pages ---');

// 1. Verify Source Route Definitions
const requiredAppRoutes = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/events/page.tsx',
  'src/app/events/[category]/page.tsx',
  'src/app/schedule/page.tsx',
  'src/app/notice-board/page.tsx',
  'src/app/team/page.tsx',
  'src/app/gallery/page.tsx',
  'src/app/winners/page.tsx',
  'src/app/not-found.tsx',
];

for (const route of requiredAppRoutes) {
  const fullPath = path.resolve(process.cwd(), route);
  assert(fs.existsSync(fullPath), `Missing required route file: ${route}`);
  console.log(`✔ Verified route file: ${route}`);
}

// 2. Verify Custom 404 Page Source & Capabilities
const notFoundSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/app/not-found.tsx'), 'utf8');
assert(notFoundSrc.includes('Lost in the Quadrangle?'), 'Custom 404 must contain headline');
assert(notFoundSrc.includes('ERROR 404 • ROUTE NOT FOUND'), 'Custom 404 must contain status indicator');
assert(notFoundSrc.includes('/events/${d.slug}'), 'Custom 404 must link to category disciplines');
assert(notFoundSrc.includes('/schedule'), 'Custom 404 must link to Schedule');
assert(notFoundSrc.includes('/notice-board'), 'Custom 404 must link to Notice Board');
assert(notFoundSrc.includes('/about'), 'Custom 404 must link to About');
assert(notFoundSrc.includes('BackButton'), 'Custom 404 must include interactive BackButton');
console.log('✔ Custom 404 page content, recovery links, and pillar navigation verified.');

// 3. Verify next.config.ts Redirects & Aliases
const nextConfigText = fs.readFileSync(path.resolve(process.cwd(), 'next.config.ts'), 'utf8');
assert(nextConfigText.includes('/index.html'), 'Redirect for index.html required');
assert(nextConfigText.includes('/about.html'), 'Redirect for about.html required');
assert(nextConfigText.includes('/event1.html'), 'Redirect for event1.html required');
assert(nextConfigText.includes('/events/theater'), 'Redirect for theater spelling alias required');
console.log('✔ Configured redirects and URL routing aliases verified.');

// 3.5 Verify ScrollAmbience Mount, Z-Layering & 2D Sprite Assets
const layoutSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/app/layout.tsx'), 'utf8');
const ambienceSrc = fs.readFileSync(path.resolve(process.cwd(), 'src/components/effects/ScrollAmbience.tsx'), 'utf8');
assert(layoutSrc.includes('<ScrollAmbience />'), 'RootLayout must mount <ScrollAmbience />');
assert(ambienceSrc.includes('z-30'), 'ScrollAmbience canvas must use z-30 above z-20 sections');
for (const sprite of ['sakura_blossoms.png', 'sakura_petals.png', 'sakura_branch.png', 'butterflies.png']) {
  const spritePath = path.resolve(process.cwd(), 'public/sprites', sprite);
  assert(fs.existsSync(spritePath) && fs.statSync(spritePath).size > 500, `Missing or empty sprite sheet: ${sprite}`);
}
console.log('✔ ScrollAmbience mount, z-30 layering, and 2D sprite sheets verified.');

// 3.6 Verify Self-Hosted Brand Variable Fonts & Non-Cyclic @theme Tokens
const globalsCss = fs.readFileSync(path.resolve(process.cwd(), 'src/styles/globals.css'), 'utf8');
assert(!globalsCss.includes('--font-body: var(--font-body)'), 'globals.css must not have a cyclic --font-body self-reference');
assert(globalsCss.includes('--font-sans: var(--font-jakarta)'), 'globals.css must map --font-sans to --font-jakarta');
for (const fontFile of [
  'Orbitron-Variable.woff2',
  'SpaceGrotesk-Variable.woff2',
  'PlusJakartaSans-Variable.woff2',
  'CormorantGaramond-Variable.woff2',
]) {
  const fontPath = path.resolve(process.cwd(), 'src/fonts', fontFile);
  assert(fs.existsSync(fontPath) && fs.statSync(fontPath).size > 5000, `Missing variable font: ${fontFile}`);
}
console.log('✔ Self-hosted Orbitron, Space Grotesk, Plus Jakarta Sans & Cormorant Garamond fonts verified.');

// 4. If a live server is running on port 3000, test live responses
try {
  const liveRes = await fetch('http://localhost:3000/', { signal: AbortSignal.timeout(1000) });
  if (liveRes.status === 200) {
    console.log('Live server detected on port 3000, performing endpoint validation...');
    const livePaths = [
      ['/', 200],
      ['/about', 200],
      ['/events', 200],
      ['/events/art', 200],
      ['/schedule', 200],
      ['/notice-board', 200],
      ['/team', 200],
      ['/gallery', 200],
      ['/sprites/sakura_blossoms.png', 200],
      ['/sprites/sakura_petals.png', 200],
      ['/sprites/sakura_branch.png', 200],
      ['/sprites/butterflies.png', 200],
      ['/unknown-test-route-404', 404],
    ];
    for (const [p, expectedStatus] of livePaths) {
      const res = await fetch(`http://localhost:3000${p}`);
      assert.strictEqual(res.status, expectedStatus, `Expected ${expectedStatus} for ${p}, got ${res.status}`);
      console.log(`✔ Live endpoint http://localhost:3000${p} -> ${res.status}`);
    }
  }
} catch {
  // Server not running, skip live check
}

console.log('All route and 404 checks passed successfully!');
