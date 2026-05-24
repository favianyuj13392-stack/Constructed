'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { IProyecto } from '../types/construred';
import StatusBadge from './StatusBadge';
import { ProjectCardSkeleton } from './SkeletonCard';

// ── Imágenes de proyectos (placeholders temáticos) ─────────────────────────
const PROJECT_IMAGES: Record<string, string> = {
  'proj-001': '/assets/casa1.JPG',
  'proj-002': '/assets/casa2.JPG',
  'proj-003': '/assets/casa3.JPG',
  'proj-004': '/assets/casa4.JPG',
};

// Fallback SVG para imágenes de proyecto
function ProjectImageFallback() {
  return (
    <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center shrink-0 absolute inset-0">
      <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
      </svg>
    </div>
  );
}

const cloudinaryLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},q_${quality || 75}/${src}`;
};

// ── Info de proyectos complementaria ──────────────────────────────────────
const PROJECT_EXTRA: Record<string, { costo?: string; ahorro?: string; inicio: string }> = {
  'proj-001': { costo: 'Bs 353.000', ahorro: 'Bs 34.500', inicio: 'Jun 2024' },
  'proj-002': { costo: 'Bs 178.000', ahorro: 'Bs 12.300', inicio: 'Jul 2024' },
  'proj-003': { inicio: 'Ago 2024' },
  'proj-004': { inicio: 'Sep 2024' },
};

interface ProjectCardProps {
  proyecto: IProyecto;
  onDelete?: (id: string) => void;
}

function ProjectCard({ proyecto, onDelete }: ProjectCardProps) {
  const extra = PROJECT_EXTRA[proyecto.id] ?? { inicio: '2024' };
  const hasPresupuesto = proyecto.estado === 'Presupuesto generado';

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de que deseas eliminar el proyecto "${proyecto.nombre}"?`)) {
      onDelete?.(proyecto.id);
    }
  };

  const CardContent = (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-start transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-green-200 cursor-pointer group">
      {/* Imagen */}
      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
        {proyecto.imagen_id ? (
          <Image loader={cloudinaryLoader} src={proyecto.imagen_id} fill alt={proyecto.nombre} className="object-cover" />
        ) : PROJECT_IMAGES[proyecto.id] ? (
          <Image src={PROJECT_IMAGES[proyecto.id]} fill alt={proyecto.nombre} className="object-cover" />
        ) : (
          <ProjectImageFallback />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-bold text-[#1B5E3B] leading-tight line-clamp-2">
            {proyecto.nombre}
          </h3>
          <div className="flex items-center gap-1 shrink-0 mt-0.5">
            {proyecto.id !== 'proj-001' && (
              <button 
                onClick={handleDelete}
                className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                title="Eliminar proyecto"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} className="w-4 h-4 group-hover:stroke-[#1B5E3B] transition-colors duration-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>

        {/* Ubicación */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
            <circle cx="12" cy="8" r="2" />
          </svg>
          {proyecto.ubicacion}, Bolivia
        </div>

        {/* Dimensiones */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-1.5">
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
            {proyecto.areaM2} m²
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M16 10v11M12 10v11" />
            </svg>
            {proyecto.pisos} {proyecto.pisos === 1 ? 'piso' : 'pisos'}
          </span>
        </div>

        {/* Inicio */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Inicio: {extra.inicio}
        </div>

        {/* Badge + Métricas */}
        <div className="flex flex-col gap-1">
          <StatusBadge estado={proyecto.estado} />
          {hasPresupuesto && extra.costo && (
            <div className="mt-1 text-xs text-gray-500">
              <span>Costo estimado </span>
              <span className="font-bold text-gray-800">{extra.costo}</span>
            </div>
          )}
          {hasPresupuesto && extra.ahorro && (
            <div className="text-xs text-gray-500">
              <span>Ahorro estimado </span>
              <span className="font-bold text-[#1B5E3B]">{extra.ahorro}</span>
            </div>
          )}
          {!hasPresupuesto && proyecto.estado !== 'En análisis' && (
            <p className="text-xs text-gray-400 mt-1">Sin presupuesto aún</p>
          )}
          {proyecto.estado === 'En análisis' && extra.costo && (
            <>
              <div className="mt-1 text-xs text-gray-500">
                Costo estimado <span className="font-bold text-gray-800">{extra.costo}</span>
              </div>
              {extra.ahorro && (
                <div className="text-xs text-gray-500">
                  Ahorro estimado <span className="font-bold text-[#1B5E3B]">{extra.ahorro}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Link href={`/proyecto/${proyecto.id}`} className="block">
      {CardContent}
    </Link>
  );
}

interface ProjectListProps {
  projects: IProyecto[];
  isLoading: boolean;
  searchQuery: string;
  onDeleteProject?: (id: string) => void;
}

export default function ProjectList({ projects, isLoading, searchQuery, onDeleteProject }: ProjectListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => <ProjectCardSkeleton key={i} />)}
      </div>
    );
  }

  const filtered = projects.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ubicacion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-sm">
        No se encontraron proyectos.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filtered.map((proyecto) => (
        <ProjectCard key={proyecto.id} proyecto={proyecto} onDelete={onDeleteProject} />
      ))}
    </div>
  );
}
