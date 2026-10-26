import React from 'react';
import { Palette, BookOpen, Music, Drama, Footprints } from 'lucide-react';
import { EventCategorySlug } from '@/types/content';

interface CategoryIconProps {
  category: EventCategorySlug | string;
  className?: string;
  size?: number;
}

export function CategoryIcon({ category, className = 'w-6 h-6', size }: CategoryIconProps) {
  const style = size ? { width: size, height: size } : undefined;

  switch (category) {
    case 'art':
      return <Palette className={className} style={style} />;
    case 'literary':
      return <BookOpen className={className} style={style} />;
    case 'music':
      return <Music className={className} style={style} />;
    case 'theatre':
      return <Drama className={className} style={style} />;
    case 'dance':
      return <Footprints className={className} style={style} />;
    default:
      return <Palette className={className} style={style} />;
  }
}
