'use client';

import type { ICalculatedFase, IPresupuestoTotals } from '../hooks/usePresupuestoCalculator';
import type { IProyecto } from '../types/construred';

const fmt = (n: number, dec = 0) =>
  n.toLocaleString('es-BO', { minimumFractionDigits: dec, maximumFractionDigits: dec });

const FASE_ICONS = ['🏗️', '🏛️', '🧱', '🎨'];

interface ExecutiveSummaryProps {
  fasesCalculadas: ICalculatedFase[];
  totales: IPresupuestoTotals;
  onViewPhases: () => void;
  proyecto?: IProyecto | null;
}

export default function ExecutiveSummary({ fasesCalculadas, totales, onViewPhases, proyecto }: ExecutiveSummaryProps) {
  const totalUSD = totales.granTotalMercadoBs * 6.96;
  const pct = totales.granTotalMercadoBs > 0
    ? ((totales.granAhorroBs / totales.granTotalMercadoBs) * 100).toFixed(2)
    : '0.00';

  return (
    <div className="space-y-5">
      {/* Project card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-3 items-start">
        <div className="w-16 h-16 rounded-xl bg-gray-200 flex items-center justify-center text-2xl shrink-0">🏠</div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-[#1B5E3B]">{proyecto?.nombre || 'Proyecto sin nombre'}</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">📍 {proyecto?.ubicacion || 'Sin ubicación'}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
            <span>📐 {proyecto?.areaM2 || 0} m²</span><span>🏢 {proyecto?.pisos || 1} {(proyecto?.pisos || 1) === 1 ? 'piso' : 'pisos'}</span>
          </div>
          <button className="text-xs text-[#1B5E3B] font-semibold mt-1 flex items-center gap-1">
            Ver detalles del proyecto
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      </div>

      {/* Resumen general */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-[#1B5E3B] mb-1">Resumen general</h2>
        <p className="text-xs text-gray-400 mb-3">Estimación inicial del costo de tu proyecto</p>
        <div className="flex items-center gap-4">
          <div className="bg-gray-50 rounded-xl p-3 flex-1">
            <p className="text-xs text-gray-500">Costo total estimado</p>
            <p className="text-xl font-bold text-gray-900">Bs {fmt(totales.granTotalMercadoBs)}</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-16 h-16 rounded-full bg-[#1B5E3B] flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-xs font-bold leading-none">100%</p>
                <p className="text-[9px] leading-none">del proyecto</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-[#1B5E3B]" />
            <div>
              <p className="text-xs text-gray-600">Total del proyecto</p>
              <p className="text-xs font-semibold text-gray-800">100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ahorro con Combos */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-[#1B5E3B] mb-1">Comparación: Mercado vs Combos</h2>
        <p className="text-xs text-gray-400 mb-3">Ahorro estimado al usar combos Construred</p>

        {/* Gráfico de barras visual */}
        <div className="flex gap-3 items-end mb-4">
          <div className="bg-green-50 rounded-xl p-3 flex-shrink-0">
            <p className="text-xs text-gray-500">Ahorro total estimado</p>
            <p className="text-2xl font-bold text-[#1B5E3B]">Bs {fmt(totales.granAhorroBs)}</p>
            <p className="text-xs text-gray-400">vs mercado tradicional</p>
          </div>
          <div className="flex-1 flex items-end gap-2 h-24">
            {/* Bar mercado */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <p className="text-[10px] text-gray-500 font-semibold">Bs {fmt(totales.granTotalMercadoBs)}</p>
              <div className="w-full bg-gray-300 rounded-t-lg" style={{ height: '64px' }} />
              <p className="text-[9px] text-gray-500 text-center">Mercado tradicional</p>
            </div>
            {/* Arrow */}
            <div className="flex flex-col items-center pb-6">
              <p className="text-[10px] text-[#1B5E3B] font-bold">{pct}% menos</p>
              <svg viewBox="0 0 40 12" className="w-10 h-3 text-[#1B5E3B]">
                <path d="M2 6 Q20 2 38 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3,2" />
                <path d="M35 3 L38 6 L35 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            {/* Bar combo */}
            <div className="flex flex-col items-center gap-1 flex-1">
              <p className="text-[10px] text-[#1B5E3B] font-semibold">Bs {fmt(totales.granTotalComboBs)}</p>
              <div className="w-full bg-[#1B5E3B] rounded-t-lg" style={{ height: '60px' }} />
              <p className="text-[9px] text-gray-500 text-center">Combos Construred</p>
            </div>
          </div>
        </div>

        {/* Tabla comparativa por fases */}
        <h3 className="text-xs font-bold text-gray-700 mb-2">Comparación por fases</h3>
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 text-gray-500 font-semibold">FASE</th>
                <th className="text-right px-2 py-2 text-gray-500 font-semibold">MERCADO</th>
                <th className="text-right px-2 py-2 text-gray-500 font-semibold">COMBOS</th>
                <th className="text-right px-3 py-2 text-[#1B5E3B] font-semibold">AHORRO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fasesCalculadas.map((fase, i) => (
                <tr key={fase.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span>{FASE_ICONS[i]}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{fase.nombre}</p>
                        <p className="text-gray-400 text-[10px]">{fase.descripcion}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 text-right text-gray-700">{fmt(fase.subtotalMercadoBs * 6.96)}</td>
                  <td className="px-2 py-2.5 text-right text-gray-700">{fmt(fase.subtotalComboBs * 6.96)}</td>
                  <td className="px-3 py-2.5 text-right font-bold text-[#1B5E3B]">{fmt(fase.ahorroFaseBs * 6.96)}</td>
                </tr>
              ))}
              <tr className="bg-green-50 font-bold">
                <td colSpan={3} className="px-3 py-2.5 text-[#1B5E3B] text-xs">TOTAL AHORRO</td>
                <td className="px-3 py-2.5 text-right text-[#1B5E3B] text-sm">{fmt(totales.granAhorroBs)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Beneficios */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { icon: '💰', title: 'Ahorro garantizado', desc: 'Mejores precios por volumen y negociación.' },
            { icon: '🛡️', title: 'Materiales de calidad', desc: 'Productos certificados y de marcas líderes.' },
            { icon: '🚚', title: 'Entrega coordinada', desc: 'Menos tiempos de espera y mejor planificación.' },
          ].map((b) => (
            <div key={b.title} className="text-center">
              <div className="text-xl mb-1">{b.icon}</div>
              <p className="text-[10px] font-semibold text-gray-700">{b.title}</p>
              <p className="text-[9px] text-gray-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detalle por fases */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-[#1B5E3B] mb-1">Detalle por fases</h2>
        <p className="text-xs text-gray-400 mb-3">Desglose del presupuesto estimado por fase de construcción.</p>
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 text-gray-500 font-semibold">FASE</th>
                <th className="text-left px-2 py-2 text-gray-500 font-semibold">DESCRIPCIÓN</th>
                <th className="text-right px-2 py-2 text-gray-500 font-semibold">BOB</th>
                <th className="text-right px-3 py-2 text-gray-500 font-semibold">USD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {fasesCalculadas.map((fase, i) => (
                <tr key={fase.id} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span>{FASE_ICONS[i]}</span>
                      <span className="font-semibold text-gray-800">{fase.nombre}</span>
                    </div>
                  </td>
                  <td className="px-2 py-2.5 text-gray-500">{fase.descripcion}</td>
                  <td className="px-2 py-2.5 text-right text-gray-800 font-medium">{fmt(fase.subtotalMercadoBs)}</td>
                  <td className="px-3 py-2.5 text-right text-gray-600">{fmt(fase.subtotalMercadoBs * 6.96)}</td>
                </tr>
              ))}
              <tr className="bg-green-50 font-bold">
                <td colSpan={2} className="px-3 py-2.5 text-[#1B5E3B] text-xs">Total estimado del proyecto</td>
                <td className="px-2 py-2.5 text-right text-[#1B5E3B]">{fmt(totales.granTotalMercadoBs)}</td>
                <td className="px-3 py-2.5 text-right text-[#1B5E3B]">{fmt(totalUSD)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={onViewPhases}
        className="w-full bg-[#1B5E3B] text-white font-semibold rounded-2xl py-4 flex items-center justify-center gap-2 shadow-sm hover:bg-[#164d30] active:scale-[0.98] transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Ver detalle de materiales por fase →
      </button>

      <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex gap-2">
        <span className="text-green-600 mt-0.5">ℹ️</span>
        <div>
          <p className="text-xs font-semibold text-green-800">Importante</p>
          <p className="text-xs text-green-700">Este presupuesto es una estimación inicial basada en los datos proporcionados. Podrás ver el detalle de materiales y ajustar cada fase en los siguientes pasos.</p>
        </div>
      </div>
    </div>
  );
}
