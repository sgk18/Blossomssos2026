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
  className = 'px-4 py-2.5 rounded-xl bg-[#06110C] hover:bg-[#06110C]/90 text-[#F2EFE8] border border-[#A8CBB7]/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors',
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
      <ArrowLeft className="w-4 h-4 text-[#A8CBB7]" />
      <span>{label}</span>
    </button>
  );
}
