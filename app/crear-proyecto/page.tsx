'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1B5E3B] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1B5E3B] leading-none tracking-wide">CONSTRURED</p>
            <p className="text-[10px] text-gray-400 leading-none">Construimos el futuro</p>
          </div>
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
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-50 max-w-7xl mx-auto">
      <Link href="/" className="flex flex-col items-center gap-0.5 text-xs text-gray-400 hover:text-gray-600"><IconHome />Inicio</Link>
      <button className="flex flex-col items-center gap-0.5 text-xs text-gray-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>
        Proyectos
      </button>
      <Link href="/crear-proyecto" className="w-14 h-14 rounded-full bg-[#1B5E3B] flex items-center justify-center shadow-lg -mt-5 text-white hover:bg-[#164d30] transition-colors"><IconPlus /></Link>
      <button className="flex flex-col items-center gap-0.5 text-xs text-gray-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" /></svg>
        Combos
      </button>
      <button className="flex flex-col items-center gap-0.5 text-xs text-gray-400">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        Perfil
      </button>
    </nav>
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
}

function StepForm({ onNext }: { onNext: (data: FormData) => void }) {
  const [form, setForm] = useState<FormData>({
    nombre: '', tipoObra: 'Vivienda', tipoProyecto: 'Obra nueva',
    ubicacion: 'Santa Cruz, Bolivia', area: '', pisos: '',
    fechaInicio: '', fechaFin: '', calidad: 'Estándar', descripcion: '',
  });

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
            <input className={inputCls} placeholder="Ej. Casa Familiar – Las Palmas" value={form.nombre} onChange={set('nombre')} />
          </div>

          {/* Tipo obra / Tipo proyecto */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Tipo de obra</label>
              <div className="relative">
                <select className={selectCls} value={form.tipoObra} onChange={set('tipoObra')}>
                  <option>Vivienda</option><option>Comercial</option><option>Industrial</option>
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
              <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth={2} className="absolute left-3 top-3.5 w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" /><circle cx="12" cy="8" r="2" />
              </svg>
              <input className={inputCls + " pl-9"} value={form.ubicacion} onChange={set('ubicacion')} placeholder="Ciudad, Bolivia" />
            </div>
          </div>

          {/* Área / Pisos */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Área construida estimada</label>
              <div className="relative">
                <input className={inputCls + " pr-10"} type="number" placeholder="Ej. 180" value={form.area} onChange={set('area')} />
                <span className="absolute right-3 top-3 text-xs text-gray-400 font-medium">m²</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Número de pisos</label>
              <div className="relative">
                <input className={inputCls + " pr-12"} type="number" placeholder="Ej. 2" value={form.pisos} onChange={set('pisos')} />
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
            <label className={labelCls}>Tipo de calidad / nivel de acabados</label>
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

          {/* Descripción */}
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

function StepUpload({ formData, onBack }: { formData: FormData; onBack: () => void }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [comments, setComments] = useState('');
  const [files, setFiles] = useState<FileEntry[]>([
    { label: 'Planos arquitectónicos', formats: 'PDF, JPG, PNG, DWG', description: 'Ej. Plantas, cortes, fachadas, etc.', required: true, file: null },
    { label: 'Cómputos métricos', formats: 'Excel, PDF, CSV', description: 'Archivo con metrados de la obra.', required: false, file: null },
    { label: 'Especificaciones técnicas', formats: 'PDF, DOC, DOCX', description: 'Memorias, especificaciones y detalles técnicos.', required: false, file: null },
    { label: 'Imágenes adicionales', formats: 'JPG, PNG', description: 'Fotos del terreno, entorno, referencias, etc.', required: false, file: null },
  ]);

  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFiles(prev => prev.map((item, i) => i === idx ? { ...item, file: f } : item));
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => router.push('/proyecto/las-palmas'), 2000);
  };

  const docIcons = ['📄', '📊', '📋', '🖼️'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onBack={onBack} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cargar planos y documentos</h1>
          <p className="text-sm text-gray-500 mt-1">Sube los archivos de tu proyecto para que podamos analizarlos y generar tu presupuesto inicial.</p>
        </div>

        {/* Resumen del proyecto */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-start">
          <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center shrink-0 text-2xl">🏠</div>
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
      <div className="fixed bottom-16 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 bg-gray-50/90 backdrop-blur-sm">
        <button
          onClick={handleProcess}
          disabled={isProcessing}
          className="w-full bg-[#1B5E3B] text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg hover:bg-[#164d30] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-90"
        >
          {isProcessing ? (
            <>
              <IconSpinner />
              Analizando con IA...
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Procesar información
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
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

// ── Componente raíz con control de pasos ────────────────────────────────────
export default function CrearProyectoPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<FormData>({
    nombre: '', tipoObra: 'Vivienda', tipoProyecto: 'Obra nueva',
    ubicacion: 'Santa Cruz, Bolivia', area: '', pisos: '',
    fechaInicio: '', fechaFin: '', calidad: 'Estándar', descripcion: '',
  });

  if (step === 1) {
    return <StepForm onNext={(data) => { setFormData(data); setStep(2); }} />;
  }

  return <StepUpload formData={formData} onBack={() => setStep(1)} />;
}
