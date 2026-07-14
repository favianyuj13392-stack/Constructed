'use client';

import type { ICalculatedFase, ICalculatedMaterial } from '../hooks/usePresupuestoCalculator';

const fmt = (n: number, dec = 2) =>
  n.toLocaleString('es-BO', { minimumFractionDigits: dec, maximumFractionDigits: dec });

const FASE_ICONS = ['🏗️', '🏛️', '🧱', '🎨'];

import { useState } from 'react';

// ── Fila de material con auditoría de combo ─────────────────────────────────
function MaterialRow({ mat }: { mat: ICalculatedMaterial }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasCombo = (mat.ahorroBs ?? 0) > 0;
  const hasSub = mat.subMateriales && mat.subMateriales.length > 0;

  return (
    <>
      <tr 
        onClick={() => hasSub && setIsExpanded(!isExpanded)}
        className={`border-b border-gray-50 transition-colors ${hasCombo ? 'bg-green-50/40 hover:bg-green-50' : 'bg-white hover:bg-gray-50'} ${hasSub ? 'cursor-pointer' : ''}`}
      >
        <td className="px-3 py-2.5 min-w-[140px]">
          <div className="flex items-start gap-2">
            {hasSub && (
              <button className="mt-0.5 shrink-0 text-gray-400 hover:text-gray-600 transition-transform">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            <div>
              <p className="text-xs font-semibold text-gray-800 leading-tight">{mat.descripcion}</p>
              {hasCombo && (
                <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-semibold">
                  ✓ Combo aplicado
                </span>
              )}
            </div>
          </div>
        </td>
        <td className="px-2 py-2.5 text-xs text-gray-500 text-center">{mat.unidad}</td>
        <td className="px-2 py-2.5 text-xs text-right">
          {hasCombo ? (
            <div>
              <span className="line-through text-gray-400 text-[10px] block">{fmt(mat.totalMercadoBs)}</span>
              <span className="text-[#1B5E3B] font-bold">{fmt(mat.totalComboBs)}</span>
            </div>
          ) : (
            <span className="text-gray-700">{fmt(mat.totalMercadoBs)}</span>
          )}
        </td>
      </tr>
      
      {isExpanded && hasSub && (
        <tr className="bg-gray-50/50">
          <td colSpan={7} className="px-4 py-3 border-b border-gray-100">
            <div className="pl-6">
              <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Desglose de Insumos (Por {mat.unidad})</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                {mat.subMateriales?.map((sub, idx) => {
                  const cantTotal = sub.cantidadUnitaria * mat.cantidad;
                  return (
                    <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-gray-200/50 last:border-0">
                      <span className="text-gray-600">{sub.nombre}</span>
                      <span className="font-medium text-gray-800">
                        {fmt(cantTotal)} <span className="text-gray-500 text-[10px]">{sub.unidad}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── Tabla de fase ───────────────────────────────────────────────────────────
interface PhaseTableProps {
  fasesCalculadas: ICalculatedFase[];
  activeFaseIdx: number;
  onFaseChange: (idx: number) => void;
}

export default function PhaseTable({ fasesCalculadas, activeFaseIdx, onFaseChange }: PhaseTableProps) {
  const fase = fasesCalculadas[activeFaseIdx];
  if (!fase) return null;

  return (
    <div className="space-y-4">
      {/* Selector de Fase */}
      <div>
        <h2 className="text-sm font-bold text-[#1B5E3B] mb-2">Seleccione la fase</h2>
        <div className="grid grid-cols-4 gap-2">
          {fasesCalculadas.map((f, i) => {
            const active = i === activeFaseIdx;
            return (
              <button
                key={f.id}
                onClick={() => onFaseChange(i)}
                className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border-2 transition-all duration-200 text-center ${
                  active
                    ? 'border-[#1B5E3B] bg-green-50 text-[#1B5E3B]'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{FASE_ICONS[i]}</span>
                <p className="text-[10px] font-bold leading-tight">{f.nombre}</p>
                <p className="text-[9px] leading-tight text-gray-400">{f.descripcion}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header de la fase activa */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-[#1B5E3B]">{fase.nombre}: {fase.descripcion}</h3>
            <p className="text-xs text-gray-400 mt-0.5">Incluye trabajos iniciales, preparación del terreno y materiales estimados.</p>
          </div>
          <div className="shrink-0 text-right bg-gray-50 rounded-xl px-3 py-2">
            <p className="text-[10px] text-gray-500">Costo estimado (Bs)</p>
            <p className="text-lg font-bold text-gray-900">{fmt(fase.subtotalMercadoBs, 0)}</p>
          </div>
        </div>
      </div>

      {/* Tabla de materiales */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100">
          <h4 className="text-xs font-bold text-[#1B5E3B]">Materiales de la fase</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">DESCRIPCIÓN</th>
                <th className="text-center px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">UN.</th>
                <th className="text-right px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">P.U. (Bs)</th>
                <th className="text-right px-2 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">CANT</th>
                <th className="text-right px-3 py-2 text-[10px] font-semibold text-gray-500 uppercase tracking-wide">TOTAL (Bs)</th>
              </tr>
            </thead>
            <tbody>
              {fase.materiales.map((mat) => (
                <MaterialRow key={mat.id} mat={mat} />
              ))}
            </tbody>
            <tfoot className="bg-green-50">
              <tr>
                <td colSpan={4} className="px-3 py-3 text-xs font-bold text-[#1B5E3B]">Total materiales fase (Bs)</td>
                <td className="px-3 py-3 text-right text-sm font-bold text-[#1B5E3B]">{fmt(fase.subtotalMercadoBs)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Ahorro de la fase si aplica */}
        {fase.ahorroFaseBs > 0 && (
          <div className="mx-4 mb-4 mt-2 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#1B5E3B] flex items-center justify-center shrink-0 text-white text-sm">✓</div>
            <div>
              <p className="text-xs font-bold text-[#1B5E3B]">Ahorro con Combo Construred en esta fase</p>
              <p className="text-xs text-green-700">
                Precio mercado: <span className="line-through">Bs {fmt(fase.subtotalMercadoBs)}</span> →
                Precio combo: <span className="font-bold">Bs {fmt(fase.subtotalComboBs)}</span> —
                Ahorro: <span className="font-bold">Bs {fmt(fase.ahorroFaseBs)}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Nota importante */}
      <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex gap-2">
        <span className="text-green-600">ℹ️</span>
        <div>
          <p className="text-xs font-semibold text-green-800">Importante</p>
          <p className="text-xs text-green-700">Los precios son referenciales y pueden variar según el mercado y la ubicación.</p>
        </div>
      </div>
    </div>
  );
}
