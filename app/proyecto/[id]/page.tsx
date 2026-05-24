'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProjectById, updateProject } from '../../services/construredApi';
import usePresupuestoCalculator from '../../hooks/usePresupuestoCalculator';
import type { IProyecto } from '../../types/construred';
import ExecutiveSummary from '../../components/ExecutiveSummary';
import PhaseTable from '../../components/PhaseTable';
import Image from 'next/image';

// ── Header ─────────────────────────────────────────────────────────────────
function Header() {
  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex items-center">
          <Image src="/assets/Logo.PNG" alt="Construred Logo" width={140} height={40} className="object-contain h-10 w-auto" priority />
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-1.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-gray-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#1B5E3B] flex items-center justify-center text-white text-sm font-bold">C</div>
        </div>
      </div>
    </header>
  );
}

// ── Bottom Nav ──────────────────────────────────────────────────────────────
function BottomNav() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const items = [
    {
      label: 'Inicio',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
        </svg>
      ),
      href: '/',
    },
    {
      label: 'Proyectos',
      active: true,
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </Link>
          ) : item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-0.5 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150"
            >
              {item.icon}
              {item.label}
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

// ── Skeleton ───────────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="bg-white rounded-2xl p-4 space-y-3">
        <div className="h-16 bg-gray-200 rounded-xl" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="bg-white rounded-2xl p-4 space-y-2">
        {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-200 rounded-xl" />)}
      </div>
      <div className="bg-white rounded-2xl h-48 bg-gray-200 rounded-2xl" />
    </div>
  );
}

// ── Vista principal ─────────────────────────────────────────────────────────
type TabView = 'resumen' | 'fases';

export default function ProjectPage() {
  const params = useParams();
  const id = params?.id as string;

  const [proyecto, setProyecto] = useState<IProyecto | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<TabView>('resumen');
  const [activeFaseIdx, setActiveFaseIdx] = useState(0);

  // Estados de edición
  const [isEditing, setIsEditing] = useState(false);
  const [editArea, setEditArea] = useState<number>(0);
  const [editPisos, setEditPisos] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProjectById(id).then((data) => {
      setProyecto(data);
      if (data) {
        setEditArea(data.areaM2 || 0);
        setEditPisos(data.pisos || 1);
      }
      setIsLoadingData(false);
    });
  }, [id]);

  const handleSaveEdit = async () => {
    if (!proyecto) return;
    setIsSaving(true);
    const updated = await updateProject(proyecto.id, { areaM2: editArea, pisos: editPisos });
    setProyecto(updated);
    setIsEditing(false);
    setIsSaving(false);
  };

  const { fasesCalculadas, totales, isCalculating } = usePresupuestoCalculator(proyecto?.areaM2 || 0, proyecto?.pisos || 1);
  const isLoading = isLoadingData || isCalculating;

  const TABS: { key: TabView; label: string }[] = [
    { key: 'resumen', label: 'Resumen Ejecutivo' },
    { key: 'fases', label: 'Fases Constructivas' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-5">
        {/* Título y Edición */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1B5E3B]">Dashboard Financiero</h1>
            <p className="text-sm text-gray-500 mt-1">
              {proyecto ? `${proyecto.nombre} · ${proyecto.estado}` : 'Cargando...'}
            </p>
          </div>

          {proyecto && (
            <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm min-w-[240px]">
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <label className="flex-1">
                      <span className="text-xs text-gray-500 block mb-1">Área (m²)</span>
                      <input 
                        type="number" 
                        className="w-full text-sm border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:border-[#1B5E3B]"
                        value={editArea}
                        onChange={(e) => setEditArea(Number(e.target.value))}
                        min="1"
                      />
                    </label>
                    <label className="flex-1">
                      <span className="text-xs text-gray-500 block mb-1">Pisos</span>
                      <input 
                        type="number" 
                        className="w-full text-sm border border-gray-300 rounded-lg p-1.5 focus:outline-none focus:border-[#1B5E3B]"
                        value={editPisos}
                        onChange={(e) => setEditPisos(Number(e.target.value))}
                        min="1"
                      />
                    </label>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-1.5 text-xs text-gray-500 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                      disabled={isSaving}
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={handleSaveEdit}
                      className="flex-1 py-1.5 text-xs text-white bg-[#1B5E3B] font-medium hover:bg-[#164d30] rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Guardando...' : 'Guardar'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{proyecto.areaM2}</span> m² · <span className="font-semibold text-gray-900">{proyecto.pisos}</span> {proyecto.pisos === 1 ? 'piso' : 'pisos'}
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-[#1B5E3B] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tabs de navegación */}
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-100 flex gap-1 mb-5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-[#1B5E3B] text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : activeTab === 'resumen' ? (
          <ExecutiveSummary
            fasesCalculadas={fasesCalculadas}
            totales={totales}
            onViewPhases={() => setActiveTab('fases')}
            proyecto={proyecto}
          />
        ) : (
          <PhaseTable
            fasesCalculadas={fasesCalculadas}
            activeFaseIdx={activeFaseIdx}
            onFaseChange={setActiveFaseIdx}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
}
