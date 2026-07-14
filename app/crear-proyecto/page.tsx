'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProject } from '../services/construredApi';
import { uploadImage } from '../services/imageService';
import Image from 'next/image';

// ── Íconos ─────────────────────────────────────────────────────────────────
function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconSpinner() {
  return (
    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}
function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-[#1B5E3B]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4-4 4M12 8v8" />
    </svg>
  );
}

// ── Header compartido ───────────────────────────────────────────────────────
function Header({ onBack }: { onBack: () => void }) {
  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <button onClick={onBack} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <IconBack />
        </button>
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
              <IconPlus />
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
              onClick={() => showToast('Disponible en la Versión 1.0 🚀')}
              className="flex flex-col items-center gap-0.5 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-150"
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

// ── Paso 1: Formulario de Creación ──────────────────────────────────────────
interface FormData {
  nombre: string;
  tipoObra: string;
  tipoProyecto: string;
  ubicacion: string;
  area: string;
  pisos: string;
  fechaInicio: string;
  fechaFin: string;
  calidad: 'Económica' | 'Estándar' | 'Premium';
  descripcion: string;
  // Estructura
  tipoEstructura?: string;
  cargaViva?: string;
  cargaAdicional?: string;
  cargaMuerta?: string;
  cargaPesoPropio?: string;
  espesorLosa?: string;
  ejeViguetas?: string;
  apoyoViguetas?: string;
  longitudComplementos?: string;
  cargaTotal?: string;
  relacionLe?: string;
}

const STRUCTURAL_DEFAULTS: Record<string, Partial<FormData>> = {
  'vivienda': { tipoEstructura: 'Vivienda', cargaViva: '200', cargaAdicional: '0', cargaMuerta: '80', cargaPesoPropio: '188.08', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '468.08', relacionLe: '20.0' },
  'comercial': { tipoEstructura: 'Comercial', cargaViva: '400', cargaAdicional: '0', cargaMuerta: '100', cargaPesoPropio: '210.50', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '710.50', relacionLe: '22.0' },
  'industrial': { tipoEstructura: 'Industrial', cargaViva: '600', cargaAdicional: '50', cargaMuerta: '120', cargaPesoPropio: '250.00', espesorLosa: '25', ejeViguetas: '0.6', apoyoViguetas: '10.0', longitudComplementos: '100', cargaTotal: '1020.00', relacionLe: '25.0' },
  'gimnasios': { tipoEstructura: 'Gimnasios', cargaViva: '500', cargaAdicional: '0', cargaMuerta: '80', cargaPesoPropio: '188.08', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '768.08', relacionLe: '22.5' },
  'losas de cubierta sin acceso': { tipoEstructura: 'Cubierta', cargaViva: '100', cargaAdicional: '0', cargaMuerta: '80', cargaPesoPropio: '188.08', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '368.08', relacionLe: '20.0' },
  'viviendas unifamiliares': { tipoEstructura: 'Vivienda Unifamiliar', cargaViva: '200', cargaAdicional: '0', cargaMuerta: '80', cargaPesoPropio: '188.08', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '468.08', relacionLe: '20.0' },
  'oficinas privadas': { tipoEstructura: 'Oficinas', cargaViva: '250', cargaAdicional: '0', cargaMuerta: '100', cargaPesoPropio: '188.08', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '538.08', relacionLe: '21.0' },
  'oficinas publicas': { tipoEstructura: 'Oficinas', cargaViva: '300', cargaAdicional: '0', cargaMuerta: '100', cargaPesoPropio: '210.50', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '610.50', relacionLe: '22.0' },
  'aulas de escuelas': { tipoEstructura: 'Educación', cargaViva: '300', cargaAdicional: '0', cargaMuerta: '100', cargaPesoPropio: '210.50', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '610.50', relacionLe: '22.0' },
  'pasillos de escuelas': { tipoEstructura: 'Educación', cargaViva: '400', cargaAdicional: '0', cargaMuerta: '100', cargaPesoPropio: '210.50', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '710.50', relacionLe: '22.0' },
  'restaurantes': { tipoEstructura: 'Comercial', cargaViva: '400', cargaAdicional: '0', cargaMuerta: '120', cargaPesoPropio: '210.50', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '730.50', relacionLe: '22.0' },
  'comercios particulares': { tipoEstructura: 'Comercial', cargaViva: '400', cargaAdicional: '0', cargaMuerta: '100', cargaPesoPropio: '210.50', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '710.50', relacionLe: '22.0' },
  'estadios': { tipoEstructura: 'Estadios', cargaViva: '500', cargaAdicional: '50', cargaMuerta: '150', cargaPesoPropio: '250.00', espesorLosa: '25', ejeViguetas: '0.6', apoyoViguetas: '10.0', longitudComplementos: '100', cargaTotal: '950.00', relacionLe: '24.0' },
  'sala de terapia hospitales': { tipoEstructura: 'Salud', cargaViva: '300', cargaAdicional: '0', cargaMuerta: '100', cargaPesoPropio: '210.50', espesorLosa: '20', ejeViguetas: '0.5', apoyoViguetas: '7.5', longitudComplementos: '120', cargaTotal: '610.50', relacionLe: '22.0' },
  'fabricas en general': { tipoEstructura: 'Industrial', cargaViva: '600', cargaAdicional: '50', cargaMuerta: '120', cargaPesoPropio: '250.00', espesorLosa: '25', ejeViguetas: '0.6', apoyoViguetas: '10.0', longitudComplementos: '100', cargaTotal: '1020.00', relacionLe: '25.0' },
};

function StepForm({ onNext }: { onNext: (data: FormData) => void }) {
  const [form, setForm] = useState<FormData>({
    nombre: '', tipoObra: 'Vivienda', tipoProyecto: 'Obra nueva',
    ubicacion: 'Santa Cruz, Bolivia', area: '', pisos: '',
    fechaInicio: '', fechaFin: '', calidad: 'Estándar', descripcion: '',
  });

  useEffect(() => {
    const key = form.tipoObra.toLowerCase();
    if (STRUCTURAL_DEFAULTS[key]) {
      setForm(prev => ({
        ...prev,
        ...STRUCTURAL_DEFAULTS[key]
      }));
    }
  }, [form.tipoObra]);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1B5E3B] focus:ring-1 focus:ring-[#1B5E3B]/30 transition-all bg-white";
  const selectCls = inputCls + " appearance-none";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1.5";

  const CALIDADES = [
    { key: 'Económica', icon: '☆', emoji: '⭐' },
    { key: 'Estándar', icon: '★', emoji: '⭐⭐' },
    { key: 'Premium', icon: '💎', emoji: '💎' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={() => window.history.back()} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 pt-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Crear proyecto</h1>
          <p className="text-sm text-gray-500 mt-1">Ingresa la información básica de tu obra para generar tu presupuesto inicial.</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-sm font-bold text-[#1B5E3B]">Información básica</h2>

          {/* Nombre */}
          <div>
            <label className={labelCls}>Nombre del proyecto</label>
            <input className={inputCls} placeholder="Ej. Casa Familiar – Las Palmas" value={form.nombre} onChange={set('nombre')} required />
          </div>

          {/* Tipo obra / Tipo proyecto */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tipo de obra</label>
              <div className="relative">
                <select className={selectCls} value={form.tipoObra} onChange={set('tipoObra')}>
                  <option>Vivienda</option>
                  <option>Comercial</option>
                  <option>Industrial</option>
                  <option>Gimnasios</option>
                  <option>Losas de cubierta sin acceso</option>
                  <option>Viviendas unifamiliares</option>
                  <option>Oficinas privadas</option>
                  <option>Oficinas publicas</option>
                  <option>Aulas de escuelas</option>
                  <option>Pasillos de escuelas</option>
                  <option>Restaurantes</option>
                  <option>Comercios particulares</option>
                  <option>Estadios</option>
                  <option>Sala de terapia hospitales</option>
                  <option>Fabricas en general</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <div>
              <label className={labelCls}>Tipo de proyecto</label>
              <div className="relative">
                <select className={selectCls} value={form.tipoProyecto} onChange={set('tipoProyecto')}>
                  <option>Obra nueva</option><option>Ampliación</option><option>Remodelación</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label className={labelCls}>Ubicación</label>
            <div className="relative">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} className="absolute left-3 top-3.5 w-4 h-4 pointer-events-none z-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" /><circle cx="12" cy="8" r="2" />
              </svg>
              <select className={selectCls + " pl-9"} value={form.ubicacion} onChange={set('ubicacion')} required>
                <option value="Santa Cruz, Bolivia">Santa Cruz, Bolivia</option>
                <option value="La Paz, Bolivia">La Paz, Bolivia</option>
                <option value="Cochabamba, Bolivia">Cochabamba, Bolivia</option>
                <option value="El Alto, Bolivia">El Alto, Bolivia</option>
                <option value="Beni, Bolivia">Beni, Bolivia</option>
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Área / Pisos */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Área construida estimada</label>
              <div className="relative">
                <input className={inputCls + " pr-10"} type="number" placeholder="Ej. 180" value={form.area} onChange={set('area')} required min="1" />
                <span className="absolute right-3 top-3 text-xs text-gray-400 font-medium">m²</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Número de pisos</label>
              <div className="relative">
                <input className={inputCls + " pr-12"} type="number" placeholder="Ej. 2" value={form.pisos} onChange={set('pisos')} required min="1" />
                <span className="absolute right-3 top-3 text-xs text-gray-400 font-medium">pisos</span>
              </div>
            </div>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Fecha tentativa de inicio</label>
              <input className={inputCls} type="date" value={form.fechaInicio} onChange={set('fechaInicio')} />
            </div>
            <div>
              <label className={labelCls}>Fecha tentativa de fin</label>
              <input className={inputCls} type="date" value={form.fechaFin} onChange={set('fechaFin')} />
            </div>
          </div>

          {/* Calidad */}
          <div>
            <label className={labelCls}>¡Elige la calidad de tu obra fina!</label>
            <div className="grid grid-cols-3 gap-2">
              {CALIDADES.map(({ key }) => {
                const active = form.calidad === key;
                return (
                  <button key={key} type="button"
                    onClick={() => setForm(prev => ({ ...prev, calidad: key }))}
                    className={`py-3 rounded-xl border-2 text-sm font-semibold flex flex-col items-center gap-1 transition-all duration-200 ${active
                      ? 'border-[#1B5E3B] bg-green-50 text-[#1B5E3B]'
                      : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                  >
                    <span className="text-xl">{key === 'Económica' ? '☆' : key === 'Estándar' ? '★' : '💎'}</span>
                    {key}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Datos de Estructura */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <h2 className="text-sm font-bold text-[#1B5E3B]">Datos de Estructura</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Tipo de Estructura</label>
              <input className={inputCls} value={form.tipoEstructura || ''} onChange={set('tipoEstructura')} />
            </div>
            <div>
              <label className={labelCls}>Carga Viva (kg/m²)</label>
              <input className={inputCls} type="number" value={form.cargaViva || ''} onChange={set('cargaViva')} />
            </div>
            <div>
              <label className={labelCls}>Carga Adicional (kg/m²)</label>
              <input className={inputCls} type="number" value={form.cargaAdicional || ''} onChange={set('cargaAdicional')} />
            </div>
            <div>
              <label className={labelCls}>Carga Muerta (kg/m²)</label>
              <input className={inputCls} type="number" value={form.cargaMuerta || ''} onChange={set('cargaMuerta')} />
            </div>
            <div>
              <label className={labelCls}>Peso Propio (kg/m²)</label>
              <input className={inputCls} type="number" value={form.cargaPesoPropio || ''} onChange={set('cargaPesoPropio')} step="0.01" />
            </div>
            <div>
              <label className={labelCls}>Espesor Losa (cm)</label>
              <input className={inputCls} type="number" value={form.espesorLosa || ''} onChange={set('espesorLosa')} />
            </div>
            <div>
              <label className={labelCls}>Eje de Viguetas (m)</label>
              <input className={inputCls} type="number" value={form.ejeViguetas || ''} onChange={set('ejeViguetas')} step="0.1" />
            </div>
            <div>
              <label className={labelCls}>Apoyo de Viguetas (cm)</label>
              <input className={inputCls} type="number" value={form.apoyoViguetas || ''} onChange={set('apoyoViguetas')} step="0.1" />
            </div>
            <div>
              <label className={labelCls}>Long. Complementos (cm)</label>
              <input className={inputCls} type="number" value={form.longitudComplementos || ''} onChange={set('longitudComplementos')} />
            </div>
            <div>
              <label className={labelCls}>Carga Total (kg/m²)</label>
              <input className={inputCls} type="number" value={form.cargaTotal || ''} onChange={set('cargaTotal')} step="0.01" />
            </div>
            <div>
              <label className={labelCls}>Relación L/e</label>
              <input className={inputCls} type="number" value={form.relacionLe || ''} onChange={set('relacionLe')} step="0.1" />
            </div>
          </div>
        </div>

        {/* Descripción (Movido al final) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className={labelCls}>Descripción adicional <span className="font-normal text-gray-400">(opcional)</span></label>
            <textarea
              className={inputCls + " resize-none h-24"}
              placeholder="Cuéntanos más sobre tu proyecto, características especiales, etc."
              maxLength={250}
              value={form.descripcion}
              onChange={set('descripcion')}
            />
            <p className="text-right text-xs text-gray-400 mt-1">{form.descripcion.length}/250</p>
          </div>
        </div>

        <button
          onClick={() => onNext(form)}
          className="w-full bg-[#1B5E3B] text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-sm hover:bg-[#164d30] active:scale-[0.98] transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Guardar y continuar
        </button>
      </main>
      <BottomNav />
    </div>
  );
}

// ── Paso 2: Carga de Planos ─────────────────────────────────────────────────
interface FileEntry { label: string; formats: string; description: string; required: boolean; file: File | null; }

function StepUpload({ formData, onBack, onNext }: { formData: FormData; onBack: () => void; onNext: (cover: File | null) => void }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [comments, setComments] = useState('');
  const [files, setFiles] = useState<FileEntry[]>([
    { label: 'Planos arquitectónicos', formats: 'PDF, JPG, PNG, DWG', description: 'Ej. Plantas, cortes, fachadas, etc.', required: false, file: null },
    { label: 'Cómputos métricos', formats: 'Excel, PDF, CSV', description: 'Archivo con metrados de la obra.', required: false, file: null },
    { label: 'Especificaciones técnicas', formats: 'PDF, DOC, DOCX', description: 'Memorias, especificaciones y detalles técnicos.', required: false, file: null },
    { label: 'Imágenes adicionales', formats: 'JPG, PNG', description: 'Fotos del terreno, entorno, referencias, etc.', required: false, file: null },
  ]);

  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCoverImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleFileChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFiles(prev => prev.map((item, i) => i === idx ? { ...item, file: f } : item));
  };

  const handleProcess = () => {
    onNext(coverImage);
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    let imagen_id;
    if (coverImage) {
      try {
        imagen_id = await uploadImage(coverImage);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    await createProject({
      nombre: formData.nombre,
      ubicacion: formData.ubicacion,
      areaM2: Number(formData.area) || 0,
      pisos: Number(formData.pisos) || 1,
      estado: 'Borrador',
      imagen_id,
      tipoEstructura: formData.tipoEstructura,
      cargaViva: Number(formData.cargaViva) || 0,
      cargaAdicional: Number(formData.cargaAdicional) || 0,
      cargaMuerta: Number(formData.cargaMuerta) || 0,
      cargaPesoPropio: Number(formData.cargaPesoPropio) || 0,
      espesorLosa: Number(formData.espesorLosa) || 0,
      ejeViguetas: Number(formData.ejeViguetas) || 0,
      apoyoViguetas: Number(formData.apoyoViguetas) || 0,
      longitudComplementos: Number(formData.longitudComplementos) || 0,
      cargaTotal: Number(formData.cargaTotal) || 0,
      relacionLe: Number(formData.relacionLe) || 0,
    });
    router.push('/');
  };

  const docIcons = ['📄', '📊', '📋', '🖼️'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={onBack} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-56 pt-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cargar planos y documentos</h1>
          <p className="text-sm text-gray-500 mt-1">Sube los archivos de tu proyecto para que podamos analizarlos y generar tu presupuesto inicial.</p>
        </div>

        {/* Resumen del proyecto */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-start">
          <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center shrink-0 text-2xl relative overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              '🏠'
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#1B5E3B]">{formData.nombre || 'Casa Familiar – Las Palmas'}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <span>📍</span>{formData.ubicacion}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
              {formData.area && <span>📐 {formData.area} m²</span>}
              {formData.pisos && <span>🏢 {formData.pisos} {parseInt(formData.pisos) === 1 ? 'piso' : 'pisos'}</span>}
              <span>📅 Jun 2024</span>
            </div>
            <button className="text-xs text-[#1B5E3B] font-semibold mt-1 flex items-center gap-1">
              Ver detalles del proyecto
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Imagen principal (Cloudinary) */}
        <div>
          <h2 className="text-sm font-bold text-[#1B5E3B] mb-3">Imagen de portada del proyecto</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center border-dashed border-2 border-gray-200 hover:border-[#1B5E3B] transition-colors cursor-pointer" onClick={() => imageInputRef.current?.click()}>
            {previewUrl ? (
              <div className="w-full h-32 relative rounded-xl overflow-hidden mb-2">
                <img src={previewUrl} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#1B5E3B] mb-2">
                <IconUpload />
              </div>
            )}
            <p className="text-sm font-semibold text-gray-800">{coverImage ? coverImage.name : 'Subir imagen principal'}</p>
            <p className="text-xs text-gray-400">Formatos: JPG, PNG, WEBP</p>
            <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageChange} />
          </div>
        </div>

        {/* Archivos */}
        <div>
          <h2 className="text-sm font-bold text-[#1B5E3B] mb-3">Archivos del proyecto</h2>
          <div className="space-y-3">
            {files.map((entry, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl shrink-0">
                  {docIcons[idx]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">
                    {entry.label} {!entry.required && <span className="text-gray-400 font-normal text-xs">(opcional)</span>}
                  </p>
                  <p className="text-xs text-gray-400">Formatos: {entry.formats}</p>
                  <p className="text-xs text-gray-400">{entry.description}</p>
                  {entry.file && <p className="text-xs text-[#1B5E3B] font-medium mt-0.5 truncate">✓ {entry.file.name}</p>}
                </div>
                <button
                  disabled={isProcessing}
                  onClick={() => fileRefs.current[idx]?.click()}
                  className="flex flex-col items-center gap-1 shrink-0 text-[#1B5E3B] hover:text-[#164d30] transition-colors disabled:opacity-50"
                >
                  <IconUpload />
                  <span className="text-xs font-medium">Subir archivo</span>
                </button>
                <input
                  ref={el => { fileRefs.current[idx] = el; }}
                  type="file"
                  className="hidden"
                  accept={entry.formats.split(', ').map(f => `.${f.toLowerCase()}`).join(',')}
                  onChange={handleFileChange(idx)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Comentarios */}
        <div>
          <h2 className="text-sm font-bold text-[#1B5E3B] mb-2">Comentarios adicionales</h2>
          <textarea
            disabled={isProcessing}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1B5E3B] focus:ring-1 focus:ring-[#1B5E3B]/30 transition-all bg-white resize-none h-24 disabled:opacity-50"
            placeholder="Cuéntanos cualquier detalle importante sobre tu proyecto, requerimientos especiales, dudas, etc."
            maxLength={500}
            value={comments}
            onChange={e => setComments(e.target.value)}
          />
          <p className="text-right text-xs text-gray-400 mt-1">{comments.length}/500</p>
        </div>
      </main>

      {/* CTA Fijo */}
      <div className="fixed bottom-16 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 bg-gray-50/90 backdrop-blur-sm space-y-2">
        <button
          onClick={handleProcess}
          disabled={isProcessing || isSavingDraft}
          className="w-full bg-[#1B5E3B] text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg hover:bg-[#164d30] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-90"
        >
          {isProcessing ? (
            <><IconSpinner />Analizando con IA...</>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Continuar
            </>
          )}
        </button>

        <button
          onClick={handleSaveDraft}
          disabled={isProcessing || isSavingDraft}
          className="w-full bg-white text-gray-600 font-semibold rounded-2xl py-3 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSavingDraft ? (
            <><IconSpinner />Guardando...</>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Guardar como Borrador
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Tus archivos están protegidos y solo se usan para el análisis del proyecto.
        </p>
      </div>

      <BottomNav />
    </div>
  );
}

// ── Paso 3: Arma tu Combo ───────────────────────────────────────────────────
function StepCombo({ formData, coverImage, onBack }: { formData: FormData; coverImage: File | null; onBack: () => void }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  
  const soboceProducts = [
    { id: 'Cemento', title: 'Cemento SOBOCE', desc: 'Sacos de 50kg, alta resistencia inicial y final.', img: '/assets/cemento.png' },
    { id: 'Hormigón', title: 'Hormigón Premezclado', desc: 'Dosificación exacta para tu obra, entrega en camión.', img: '/assets/hormigon.png' },
    { id: 'Prefabricado', title: 'Prefabricados', desc: 'Viguetas, losas y elementos listos para instalar.', img: '/assets/prefabricado.png' }
  ];
  
  const otherProducts = [
    { id: 'Acero', desc: 'Barras corrugadas', img: '/assets/acero.png' },
    { id: 'Ladrillo', desc: 'Cerámicos de construcción', img: '/assets/ladrillo.png' },
    { id: 'Cemento blanco', desc: 'Para acabados finos', img: '/assets/cemento-blanco.png' },
    { id: 'Cemento cola', desc: 'Adhesivo cerámico', img: '/assets/cemento-cola.png' },
    { id: 'Pintura', desc: 'Látex e impermeabilizantes', img: '/assets/pintura.png' },
    { id: 'Estuco', desc: 'Revestimiento interior', img: '/assets/estuco.png' },
    { id: 'Yeso', desc: 'Acabados y molduras', img: '/assets/yeso.png' },
    { id: 'Alambre', desc: 'Alambre de amarre', img: '/assets/alambre.png' },
    { id: 'Cerámica', desc: 'Pisos y revestimientos', img: '/assets/ceramica.png' },
    { id: 'Grifería', desc: 'Baños y cocinas', img: '/assets/griferia.png' }
  ];

  const toggleProduct = (prod: string) => {
    setSelected(prev => prev.includes(prod) ? prev.filter(p => p !== prod) : [...prev, prod]);
  };

  const soboceCount = selected.filter(p => soboceProducts.some(sp => sp.id === p)).length;
  const isValid = soboceCount >= 2;

  const handleProcess = () => {
    if (!isValid) return;
    setIsProcessing(true);
    setTimeout(async () => {
      let imagen_id;
      if (coverImage) {
        try {
          imagen_id = await uploadImage(coverImage);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }

      const nuevoProyecto = await createProject({
        nombre: formData.nombre,
        ubicacion: formData.ubicacion,
        areaM2: Number(formData.area) || 0,
        pisos: Number(formData.pisos) || 1,
        estado: 'Presupuesto generado',
        imagen_id,
        productosCombo: selected,
        tipoEstructura: formData.tipoEstructura,
        cargaViva: Number(formData.cargaViva) || 0,
        cargaAdicional: Number(formData.cargaAdicional) || 0,
        cargaMuerta: Number(formData.cargaMuerta) || 0,
        cargaPesoPropio: Number(formData.cargaPesoPropio) || 0,
        espesorLosa: Number(formData.espesorLosa) || 0,
        ejeViguetas: Number(formData.ejeViguetas) || 0,
        apoyoViguetas: Number(formData.apoyoViguetas) || 0,
        longitudComplementos: Number(formData.longitudComplementos) || 0,
        cargaTotal: Number(formData.cargaTotal) || 0,
        relacionLe: Number(formData.relacionLe) || 0,
      });
      router.push('/proyecto/' + nuevoProyecto.id);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <Header onBack={onBack} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Arma tu combo</h1>
          <p className="text-sm text-gray-500 mt-1">Selecciona los materiales que usarás. Mínimo 2 productos SOBOCE para procesar el proyecto.</p>
        </div>

        {/* Productos SOBOCE */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-base font-bold text-[#1B5E3B]">Productos SOBOCE</h2>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors ${soboceCount >= 2 ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
              {soboceCount >= 2 ? '✓ Listo' : '⚠️ Requerido'} ({soboceCount}/2)
            </span>
          </div>
          <div className="flex flex-col gap-4">
            {soboceProducts.map(prod => {
              const isSelected = selected.includes(prod.id);
              return (
                <button
                  key={prod.id}
                  onClick={() => toggleProduct(prod.id)}
                  className={`relative overflow-hidden flex items-stretch text-left rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md bg-white ${
                    isSelected ? 'border-[#1B5E3B] ring-2 ring-[#1B5E3B]/20 shadow-sm bg-green-50/20' : 'border-gray-100 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-1/3 sm:w-48 bg-gray-50 flex items-center justify-center p-4 border-r ${isSelected ? 'border-green-100' : 'border-gray-100'}`}>
                    <img src={prod.img} alt={prod.title} className="w-full h-full object-contain drop-shadow-md max-h-32" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-bold text-base md:text-lg ${isSelected ? 'text-[#1B5E3B]' : 'text-gray-800'}`}>{prod.title}</h3>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#1B5E3B] border-[#1B5E3B] text-white' : 'border-gray-300'}`}>
                        {isSelected && <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l3 3 5-5" /></svg>}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mt-1">{prod.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Otros Materiales */}
        <div>
          <h2 className="text-base font-bold text-gray-700 mb-4">Otros Materiales y Acabados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherProducts.map(prod => {
              const isSelected = selected.includes(prod.id);
              return (
                <button
                  key={prod.id}
                  onClick={() => toggleProduct(prod.id)}
                  className={`flex items-center p-3 rounded-xl border transition-all duration-200 text-left bg-white ${
                    isSelected ? 'border-[#1B5E3B] bg-green-50/30 shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-12 h-12 shrink-0 mr-4 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100">
                    <img src={prod.img} alt={prod.id} className="w-8 h-8 object-contain opacity-80" onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'; }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-semibold truncate ${isSelected ? 'text-[#1B5E3B]' : 'text-gray-800'}`}>{prod.id}</h3>
                    <p className="text-xs text-gray-400 truncate">{prod.desc}</p>
                  </div>
                  <div className={`w-4 h-4 ml-3 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#1B5E3B] border-[#1B5E3B] text-white' : 'border-gray-300'}`}>
                    {isSelected && <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7l3 3 5-5" /></svg>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <div className="fixed bottom-16 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 bg-gray-50/90 backdrop-blur-sm pt-4">
        <button
          onClick={handleProcess}
          disabled={!isValid || isProcessing}
          className="w-full bg-[#1B5E3B] text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-xl hover:bg-[#164d30] hover:shadow-2xl active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
        >
          {isProcessing ? (
            <><IconSpinner />Generando Presupuesto Inteligente...</>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Finalizar y Generar Presupuesto
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ── Componente raíz con control de pasos ────────────────────────────────────
export default function CrearProyectoPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FormData>({
    nombre: '', tipoObra: 'Vivienda', tipoProyecto: 'Obra nueva',
    ubicacion: 'Santa Cruz, Bolivia', area: '', pisos: '',
    fechaInicio: '', fechaFin: '', calidad: 'Estándar', descripcion: '',
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);

  if (step === 1) {
    return <StepForm onNext={(data) => { setFormData(data); setStep(2); }} />;
  }

  if (step === 2) {
    return <StepUpload 
      formData={formData} 
      onBack={() => setStep(1)} 
      onNext={(cover) => { setCoverImage(cover); setStep(3); }} 
    />;
  }

  return <StepCombo formData={formData} coverImage={coverImage} onBack={() => setStep(2)} />;
}
