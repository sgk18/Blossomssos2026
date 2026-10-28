'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  className?: string;
  fallbackUrl?: string;
}

export function BackButton({ 
  label = 'Go Back', 
  className = 'px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFDBC3]/50 text-[#3D246C] border border-[#3D246C]/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C4B99]',
  fallbackUrl = '/'
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={className}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4 text-[#5C4B99]" />
      <span>{label}</span>
    </button>
  );
}
