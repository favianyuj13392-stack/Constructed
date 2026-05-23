'use client';

import type { IProyecto } from '../types/construred';

type Estado = IProyecto['estado'];

const BADGE_STYLES: Record<Estado, { bg: string; text: string; dot: string; label: string }> = {
  'Presupuesto generado': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    dot: 'bg-green-500',
    label: 'Presupuesto generado',
  },
  'En análisis': {
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
    label: 'En análisis',
  },
  'En carga': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    dot: 'bg-blue-500',
    label: 'En carga',
  },
  Borrador: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    dot: 'bg-gray-400',
    label: 'Borrador',
  },
};

interface StatusBadgeProps {
  estado: Estado;
}

export default function StatusBadge({ estado }: StatusBadgeProps) {
  const style = BADGE_STYLES[estado];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </span>
  );
}
