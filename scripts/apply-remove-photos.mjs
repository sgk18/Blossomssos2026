import fs from 'fs';

// Helper to normalize line endings
const clean = (str) => str.replace(/\r\n/g, '\n');

// 1. src/components/team/OurTeamsSection.tsx
let teamSection = fs.readFileSync('src/components/team/OurTeamsSection.tsx', 'utf8');
teamSection = teamSection.replace(/import Image from 'next\/image';\r?\n/, '');

// Replace card image with monogram
teamSection = teamSection.replace(
  /\{member\.image \? \(\s*<Image[\s\S]*?\/>\s*\) : \(\s*\/\* Fallback Monogram matching MN1, MN2 \*\/\s*<div[\s\S]*?<\/span>\s*<\/div>\s*\)\}/,
  `<div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#9F91CC]/25 to-white">
                    <span className="font-serif text-3xl font-bold text-[#5C4B99] select-none">
                      {member.initials || \`MN\${index + 1}\`}
                    </span>
                  </div>`
);

// Replace modal image with monogram
teamSection = teamSection.replace(
  /\{activeMember\.image \? \(\s*<Image[\s\S]*?\/>\s*\) : \(\s*<div[\s\S]*?<\/div>\s*\)\}/,
  `<div className="w-full h-full flex items-center justify-center font-serif font-bold text-3xl text-[#5C4B99] bg-gradient-to-b from-[#9F91CC]/25 to-white">
                      {activeMember.initials}
                    </div>`
);
fs.writeFileSync('src/components/team/OurTeamsSection.tsx', teamSection, 'utf8');
console.log('1. OurTeamsSection updated');

// 2. src/components/gallery/GalleryCoverflow.tsx
let coverflow = fs.readFileSync('src/components/gallery/GalleryCoverflow.tsx', 'utf8');
coverflow = coverflow.replace(/import Image from 'next\/image';\r?\n/, '');
if (!coverflow.includes('Camera,')) {
  coverflow = coverflow.replace('import { ChevronLeft,', 'import { Camera, ChevronLeft,');
}
coverflow = coverflow.replace(
  /<Image[\s\S]*?priority=\{absOffset <= 1\}\s*\/>/,
  `<div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#3D246C] via-[#5C4B99] to-[#3D246C]">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 shadow-inner">
                      <Camera className="w-8 h-8 text-[#FFDBC3]/90" />
                    </div>
                    <span className="font-tech text-xs text-[#FFDBC3]/75 uppercase tracking-widest font-semibold">
                      {slide.pillar}
                    </span>
                  </div>`
);
fs.writeFileSync('src/components/gallery/GalleryCoverflow.tsx', coverflow, 'utf8');
console.log('2. GalleryCoverflow updated');

// 3. src/components/gallery/GalleryFannedDeck.tsx
let fanned = fs.readFileSync('src/components/gallery/GalleryFannedDeck.tsx', 'utf8');
fanned = fanned.replace(/import Image from 'next\/image';\r?\n/, '');
fanned = fanned.replace(
  /<Image[\s\S]*?className="object-cover"\s*\/>/,
  `<div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#3D246C] via-[#5C4B99] to-[#3D246C]">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-2 shadow-inner">
                      <Flame className="w-6 h-6 text-[#FFDBC3]" />
                    </div>
                    <span className="font-tech text-[10px] text-[#FFDBC3]/75 uppercase tracking-wider font-semibold">
                      {card.category}
                    </span>
                  </div>`
);
fs.writeFileSync('src/components/gallery/GalleryFannedDeck.tsx', fanned, 'utf8');
console.log('3. GalleryFannedDeck updated');

// 4. src/components/gallery/GalleryBentoGrid.tsx
let bento = fs.readFileSync('src/components/gallery/GalleryBentoGrid.tsx', 'utf8');
bento = bento.replace(/import Image from 'next\/image';\r?\n/, '');
if (!bento.includes('Camera,')) {
  bento = bento.replace(/import \{\s*ChevronDown,/, 'import { \n  Camera,\n  ChevronDown,');
}

// Replace card image
bento = bento.replace(
  /<Image[\s\S]*?loading=\{index < 4 \? 'eager' : 'lazy'\}\s*\/>/,
  `<div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#3D246C] via-[#5C4B99] to-[#3D246C]">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-2 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-[#FFDBC3]/90" />
                    </div>
                    <span className="font-tech text-[10px] sm:text-xs text-[#FFDBC3]/70 uppercase tracking-widest font-semibold">
                      {item.categoryLabel}
                    </span>
                  </div>`
);

// Replace modal image
bento = bento.replace(
  /<Image[\s\S]*?priority\s*\/>/,
  `<div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#3D246C] via-[#5C4B99] to-[#3D246C]">
                  <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mb-3 shadow-inner">
                    <Camera className="w-8 h-8 text-[#FFDBC3]" />
                  </div>
                  <span className="font-tech text-xs text-[#FFDBC3]/80 uppercase tracking-widest font-bold">
                    {activeModalItem.categoryLabel}
                  </span>
                  <p className="font-angular text-base text-white/95 font-bold mt-1">
                    {activeModalItem.title}
                  </p>
                </div>`
);
fs.writeFileSync('src/components/gallery/GalleryBentoGrid.tsx', bento, 'utf8');
console.log('4. GalleryBentoGrid updated');
