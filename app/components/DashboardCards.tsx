'use client';

import type { IGlobalMetrics } from '../types/construred';
import { MetricCardSkeleton } from './SkeletonCard';

// ── Íconos SVG inline (extraídos del mockup) ───────────────────────────────
function IconFolder() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function IconSaving() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
      <polyline strokeLinecap="round" strokeLinejoin="round" points="17 21 17 13 7 13 7 21" />
      <polyline strokeLinecap="round" strokeLinejoin="round" points="7 3 7 8 15 8" />
    </svg>
  );
}

function IconCashback() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3" />
    </svg>
  );
}

// ── Formateador monetario ──────────────────────────────────────────────────
function formatBs(value: number): string {
  return `Bs ${value.toLocaleString('es-BO')}`;
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  large?: boolean;
}

function MetricCard({ icon, title, value, subtitle, large }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-[#1B5E3B] flex items-center justify-center text-white shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-0.5">{title}</p>
          <p className={`font-bold text-gray-900 leading-tight ${large ? 'text-xl' : 'text-2xl'}`}>
            {value}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

interface DashboardCardsProps {
  metrics: IGlobalMetrics | null;
  isLoading: boolean;
}

export default function DashboardCards({ metrics, isLoading }: DashboardCardsProps) {
  if (isLoading || !metrics) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => <MetricCardSkeleton key={i} />)}
      </div>
    );
  }

  const cards = [
    {
      icon: <IconFolder />,
      title: 'Proyectos totales',
      value: String(metrics.proyectosTotales),
      subtitle: 'Todos tus proyectos',
    },
    {
      icon: <IconDocument />,
      title: 'Presupuestos generados',
      value: String(metrics.presupuestosGenerados),
      subtitle: 'Proyectos con presupuesto',
    },
    {
      icon: <IconSaving />,
      title: 'Ahorro total',
      value: formatBs(metrics.ahorroTotalEstimadoBs),
      subtitle: 'En todos tus proyectos',
      large: true,
    },
    {
      icon: <IconCashback />,
      title: 'Cashback acumulado',
      value: formatBs(metrics.cashbackProyectadoBs),
      subtitle: 'Por compras en combos',
      large: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card, i) => (
        <MetricCard key={i} {...card} />
      ))}
    </div>
  );
}
