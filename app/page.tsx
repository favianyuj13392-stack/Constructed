'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getGlobalMetrics, getProjectsList } from './services/construredApi';
import type { IGlobalMetrics, IProyecto } from './types/construred';
import Image from 'next/image';
import DashboardCards from './components/DashboardCards';
import ProjectList from './components/ProjectList';

// ── Íconos del Header ──────────────────────────────────────────────────────
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-gray-600">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-400">
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-gray-600">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ── Bottom Nav ─────────────────────────────────────────────────────────────
function BottomNav() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const items = [
    {
      label: 'Inicio',
      active: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
        </svg>
      ),
    },
    {
      label: 'Proyectos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
        </svg>
      ),
    },
    { label: 'Nuevo', isCenter: true },
    {
      label: 'Combos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      label: 'Perfil',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Toast de feedback */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] animate-fade-in">
          <div className="bg-gray-800 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 whitespace-nowrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 text-yellow-400 shrink-0">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {toast}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-50 max-w-7xl mx-auto">
        {items.map((item) =>
          item.isCenter ? (
            <Link
              key={item.label}
              href="/crear-proyecto"
              className="w-14 h-14 rounded-full bg-[#1B5E3B] flex items-center justify-center shadow-lg -mt-5 text-white hover:bg-[#164d30] transition-colors duration-200"
            >
              <IconPlus />
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={item.active ? undefined : () => showToast('Disponible en la Versión 1.0 🚀')}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors duration-150 ${
                item.active ? 'text-[#1B5E3B] font-semibold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          )
        )}
      </nav>
    </>
  );
}

// ── Banner Promo ───────────────────────────────────────────────────────────
function PromoBanner() {
  return (
    <div className="rounded-2xl bg-[#1B5E3B] p-4 flex items-center justify-between gap-3 overflow-hidden relative">
      {/* Contenido */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} className="w-5 h-5">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 3" />
          </svg>
        </div>
        <div>
          <p className="text-white font-bold text-sm">Construye más, ahorra más</p>
          <p className="text-white/70 text-xs leading-snug">
            Obtén los mejores precios en materiales y recibe cashback en cada compra.
          </p>
        </div>
      </div>
      <button className="shrink-0 bg-white text-[#1B5E3B] text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1 whitespace-nowrap">
        Ver combos
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

// ── Page Component Principal ───────────────────────────────────────────────
export default function Home() {
  const [metrics, setMetrics] = useState<IGlobalMetrics | null>(null);
  const [projects, setProjects] = useState<IProyecto[]>([]);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getGlobalMetrics().then((data) => {
      setMetrics(data);
      setIsLoadingMetrics(false);
    });

    getProjectsList().then((data) => {
      setProjects(data);
      setIsLoadingProjects(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image src="/assets/Logo.PNG" alt="Construred Logo" width={140} height={40} className="object-contain h-10 w-auto" priority />
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <button className="relative p-2">
              <IconBell />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-green-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1B5E3B] flex items-center justify-center text-white text-sm font-bold">
              C
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-5 space-y-5">

        {/* Saludo */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            ¡Hola, Constructor! <span role="img" aria-label="wave">👋</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1 leading-snug">
            Gestiona tus proyectos y obtén presupuestos<br />de forma rápida y sencilla.
          </p>
        </div>

        {/* CTA Nuevo Proyecto */}
        <Link
          href="/crear-proyecto"
          className="w-full bg-[#1B5E3B] text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-sm hover:bg-[#164d30] active:scale-[0.98] transition-all duration-200"
        >
          <IconPlus />
          Nuevo proyecto
        </Link>

        {/* Tarjetas de Métricas */}
        <DashboardCards metrics={metrics} isLoading={isLoadingMetrics} />

        {/* Sección Mis Proyectos */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Mis proyectos</h2>
            <button className="w-9 h-9 bg-white rounded-xl border border-gray-200 flex items-center justify-center shadow-sm">
              <IconFilter />
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2.5 shadow-sm focus-within:border-[#1B5E3B] focus-within:ring-1 focus-within:ring-[#1B5E3B]/30 transition-all duration-200">
              <IconSearch />
              <input
                type="text"
                placeholder="Buscar proyecto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
            <button className="shrink-0 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-600 font-medium shadow-sm flex items-center gap-1 hover:border-gray-300 transition-colors duration-150">
              Todos
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Lista de proyectos */}
          <ProjectList
            projects={projects}
            isLoading={isLoadingProjects}
            searchQuery={searchTerm}
            onDeleteProject={async (id) => {
              const { deleteProject } = await import('./services/construredApi');
              await deleteProject(id);
              setProjects(prev => prev.filter(p => p.id !== id));
            }}
          />
        </div>

        {/* Banner Promo */}
        <PromoBanner />
      </main>

      {/* ── Bottom Navigation ───────────────────────────────────────────── */}
      <BottomNav />
    </div>
  );
}
